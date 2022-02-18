const fs = require('fs');
const { execSync } = require('child_process')

let count = 1


/**
 * ディレクトリ存在確認
 * @param {String} path 
 * @returns ディレクトリの存在
 */
function isExistDir(path){
	const stat = fs.statSync(`src/${path}`)
	if(stat.isDirectory()) return true
	
	console.error('指定したディレクトリが存在しません')
	return false
}

/**
 * コマンドを実行する
 * @param {String} command 文字列コマンド
 */
 function runCommand(command, isShowCommand = true){
	console.log(`${count}:\t${command}`)
	execSync(command)
	console.log("++++++++++++++++++++++")
	count++
}

/**
 * バニラ（ビルドツールなど介入なし）のビルド
 */
function buildVanilla(){
	const dirpath = process.argv[3];
	if(isExistDir(dirpath)){
		runCommand(`npx rimraf demo/${dirpath}`)
		runCommand(`npx cpx -C src/${dirpath}/**/* demo/${dirpath}`)
	}
}

/**
 * webpackによるビルド
 */
 function buildWebpack(){
	const dirpath = process.argv[3];
	if(isExistDir(dirpath)){
		runCommand(`npx rimraf demo/${dirpath}`)
		runCommand(`npm -prefix src/${dirpath} install src/${dirpath}`)
		runCommand(`npm -prefix src/${dirpath} run build`)
		runCommand(`npx cpx -C src/${dirpath}/dist/**/* demo/${dirpath}`)
	}
}

const command_dict = {
	mode_vanilla:{
		mode: 'vanilla',
		description: 'vanilla file(not builder tools)',
		exec: buildVanilla
	},
	mode_webpack:{
		mode: 'webpack',
		description: 'webpack build. depencies select dir\'s npm.',
		exec: buildWebpack
	}
}

switch(process.argv.length){
	case 3:
		if(process.argv[2] === '-h'){
			console.log('"$ node release <mode> <path/to/file>"')
			console.log('+++++++++++++++++++++++++++++++++++++')
			console.log('select <mode> in under list')
			for(let key in command_dict)
				console.log(`- ${command_dict[key].mode}:\t\t${command_dict[key].description}`)
			return 
		}
		break;
	case 4:
		for(key in command_dict){
			if(process.argv[2] === command_dict[key].mode){
				command_dict[key].exec()
				return 
			}
		}
		break;
}

console.error('"$ node release -h" show description')
		return -1




