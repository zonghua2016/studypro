## 新增分支
```javascript
git branch XXX
```
## 切换分支
```javascript
git checkout XXX
```
## 新建并切换分支
```javascript
git checkout -b XXX
```

基于远程master分支切除一个新分支
```
git checkout -b new_feature origin/master
```
## 删除分支
```javascript
git branch -d XXX
```
出于安全考虑，没有被合并到master过的branch在删除是会失败（因为可能会误删掉未完成的branch）
如果确认要删除这个branch（例如某个未完成的功能被团队确认永久毙掉了）
可以用下述命令永久删除
```javascript
git branch -D XXX
```
删除远程仓库的branch分支
```javascript
git push origin -d XXX
```

## branch的意义
推送本地分支
```
git push origin feature
```
这里的git push 多了origin feature 这个连个参数
origin 是远程仓库的别名，是在git clone时git自动起的
feature 是远程仓库中目标branch的名字
即：我要push到origin这个仓库的feature分支
在git中，默认情况下，git push 只能上传那些之前从远端clone下来的或者pull下来的分支
而如果需要push本地自己创建的分支，则需要手动指定目标仓库和目标分支（并且目标分支的名称必须和本地分支完全相同）
远程仓库中HEAD是永远指向他的默认分支的（master），并不会随着默认分支的移动而移动

***
pull内部操作其实是把远程仓库取到本地后（使用fetch），再用一次merge来把远端仓库的新commits合并到本地
***
## merge：合并commits
merge负责：从目标commit和commit（即HEAD所指向的commit）分叉的位置起，把目标commit的路径上所有commit的内容一并应用到当前commit，然后自动生成一个新的commit
```
git merge feature
```
## Feature Branching 最流行的工作流
这种工作模型的限制：使用这种工作模型时，每个人的代码在被大家看到的时候，就是它进入正式的生产库的时候
这种工作流的核心内容总结：
1、任何新功能（feature）或bug修复全部新建一个branch来写；
2、branch写完后，合并到master，然后删除这个branch

解决了团队开发的两个关键问题：
1、代码分享
2、一人多任务

## 查看历史
```
git log
```

### 查看详细历史
-p是 --patch的缩写，可以看到具体每个commit的改动细节
```
git log -p
```
### 精简历史
如果你只想大致看一下改动内容，但并不想深入每一行的细节（例如你想回顾一下自己是在哪个 commit 中修改了 games.txt 文件），那么可以把选项换成 --stat
```
git log --stat
```
### 查看任意一个commit
在 show 后面加上这个 commit 的引用（branch 或 HEAD 标记）或它的 SHA-1 码：
```
git show 5e68b0d8
```
### 看指定 commit 中的指定文件
在 commit 的引用或 SHA-1 后输入文件名：
```
git show 5e68b0d8 shopping\ list.txt
```
直接输入`gitk`命令，可以在可视化窗口中查看历史

## rebase
由于merge后就会出现分叉，显得混乱；
如果不希望出现分叉，可以用rebase来代替merge
为了避免和远端仓库发生冲突，一般不要从master向其他branch执行rebase操作
而如果是master以外的branch之间的rebase（比如branch1和branch2）直接rebase就好
```
git checkout branch1
git rebase master
```

## 刚刚提交的代码，发现写错了怎么办？ 对最新一条commit进行修正
amend是修正的意思
git会把当前commit里的内容和暂存区（stageing area）里的内容合并起来后创建一个新的commit
**用这个新的commit把当前commit替换掉**
所以commit --amend做的事是：**对最新一条commit进行修正**
__注：commit --amend 并不是直接修改原 commit 的内容，而是生成一条新的 commit__
```
git commit --amend
```
## 写错的不是最新的提交，而是倒数第二个？

### rebase -i：交互式rebase
rebase -i 是 rebase -interactive 的缩写形式，即 交互式rebase
```
git rebase -i HEAD^^
```
上面这行代码表示，把当前 commit （ HEAD 所指向的 commit） rebase 到 HEAD 之前 2 个的 commit 上

>说明：在 Git 中，有两个「偏移符号」： ^ 和 ~。
>^ 的用法：在 commit 的后面加一个或多个 ^ 号，可以把 commit 往回偏移，偏移的数量是 ^ 的数量。例如：master^ 表>示 master 指向的 commit 之前的那个 commit； HEAD^^ 表示 HEAD 所指向的 commit 往前数两个 commit。
>~ 的用法：在 commit 的后面加上 ~ 号和一个数，可以把 commit 往回偏移，偏移的数量是 ~ 号后面的数。例如：HEAD~5 >表示 HEAD 指向的 commit往前数 5 个 commit。

操作步骤：
1/git rebase -i HEAD^^
2/git add .
3/git commit --amend
4/ git rebase --continue

## 比错还错，想直接丢弃刚写的提交？

reset --hard 丢弃 **最新的提交**
即撤销这条 commit
~~一旦回退到上个版本，除非记住该版本的commit标记，否则不能再找到之后的版本了~~
~~**慎用**~~
```
git reset --hard HEAD^
```
## 想丢弃的也不是最新的提交？

### 用交互式 rebase 撤销提交
git rebase -i HEAD^^
运行命令后，直接删除不要的 commit即可

### 用 rebase --onto 撤销提交
下次再看，乱

## 代码已经 push 上去了才发现写错？

### 1. 出错的内容在你自己的 branch
强制提交覆盖本地的分支
-f 是 --force 的缩写，意为「忽略冲突，强制 push」
```
git push origin branch1 -f
```
### 2. 出错的内容已经合并到 master
**千万不能在master上强制push**

在 revert 完成之后，把新的 commit 再 push 上去，这个 commit 的内容就被撤销了。它和前面所介绍的撤销方式相比，最主要的区别是，这次改动只是被「反转」了，并没有在历史中消失掉，你的历史中会存在两条 commit ：一个原始 commit ，一个对它的反转 commit。



## git checkout branch 的本质
git checkout branch名 的本质，其实是把 HEAD 指向指定的 branch，然后签出这个 branch 所对应的 commit 的工作目录。所以同样的，checkout 的目标也可以不是 branch，而直接指定某个 commit：

git checkout HEAD^^s
git checkout master~5
git checkout 78a4bc
git checkout 78a4bc^


## 临时打包类型
stash：临时存放工作目录的改动
把当前工作目录暂时清理干净
```
git stash
```
需要的时候在重新复位
```
git stash pop
```
注意：没有被 track 的文件（即从来没有被 add 过的文件)不会被 stash 起来，因为 Git 会忽略它们。如果想把这些文件也一起 stash，可以加上 `-u` 参数，它是 `--include-untracked` 的简写。就像这样：
```
git stash -u
```