# ncg

`nodejs` + `coffeescript`  + `gulp`

[![npm version](https://badge.fury.io/js/ncg.svg)](http://badge.fury.io/js/ncg)

## Features

- 使用express generator的代码结构
- 使用ncg命令，创建项目模板

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

## Install 

	[sudo] npm install -g ncg

## Usage

```
➜  ncgtest  ncg --help

  Usage: ncg  or ncg --version

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
    -f, --force    强制把项目模板copy到当前目录下

➜  ncgtest  ncg --version
0.1.5
➜  ncgtest  ncg
➜  ncgtest  ls
Gulpfile.js  LICENSE      README.md    bin          node_modules package.json src
➜  ncgtest  npm install
...此处有省略...
➜  ncgtest  gulp            
[14:13:34] Using gulpfile ~/www/ncgtest/Gulpfile.js
[14:13:34] Starting 'watch_coffee'...
[14:13:34] Finished 'watch_coffee' after 6.5 ms
[14:13:34] Starting 'watch_bin'...
[14:13:34] Finished 'watch_bin' after 5.09 ms
[14:13:34] Starting 'watch_public'...
[14:13:34] Finished 'watch_public' after 1.85 ms
[14:13:34] Starting 'watch_views'...
[14:13:34] Finished 'watch_views' after 1.35 ms
[14:13:34] Starting 'watch_package_json'...
[14:13:34] Finished 'watch_package_json' after 468 μs
[14:13:34] Starting 'watch'...
[14:13:34] Finished 'watch' after 4.1 μs
[14:13:34] Starting 'coffeelint'...
[14:13:34] Finished 'coffeelint' after 2.38 ms
[14:13:34] Starting 'coffee'...
[14:13:34] Finished 'coffee' after 2.93 ms
[14:13:34] Starting 'stop_server'...
[14:13:34] Finished 'stop_server' after 7.42 ms
[14:13:34] Starting 'start_server'...
[14:13:34] Finished 'start_server' after 111 μs
[14:13:34] Starting 'default'...
[14:13:34] Finished 'default' after 12 μs
kill: 67203: No such process

> ncg@0.1.2 start /Users/sang/www/ncgtest
> supervisor ./build/bin/www


Running node-supervisor with
  program './build/bin/www'
  --watch '.'
  --extensions 'node,js,/build/bin/www'
  --exec 'node'

Starting child process with 'node ./build/bin/www'
Watching directory '/Users/sang/www/ncgtest' for changes.

```

如果当前目录是非空目录，请使用

	ncg -f 

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## 版本历史

- v0.1.6 更改编译目录为src下，另在package.json增加build配置项
- v0.1.2 修正watch之前没有copy的问题

## 欢迎fork和反馈

- write by `i5ting` shiren1118@126.com

如有建议或意见，请在issue提问或邮件

## License

this repo is released under the [MIT
License](http://www.opensource.org/licenses/MIT).
