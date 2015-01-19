# ncg

nodejs + coffeescript  + gulp

## Step

	npm init
	express .

## 目录说明

- src/
- build/

start 

	supervisor build/bin/www
	
	
当开发的时候，只需要

	gulp
	
然后就交给gulp的watch来做

比如

- 变动coffee就自动编译，加coffeelint
- 变动了资源文件就copy
- 由于server启动用的是supervisor，它会自动检查变动，重载的
- 增加browser-sync自动livereload浏览器内容


## detect


- **/*.coffee
- bin
- public
- views
- package.json(auto npm install)

