$(function() {
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;


    //定义美化时间的过滤器
    template.defaults.imports.dataFormat = (date) => {

        const dt = new Date(date)

        var y = Zero(dt.getFullYear());
        var m = Zero(dt.getMonth() + 1);
        var d = Zero(dt.getDate());

        var hh = Zero(dt.getHours());
        var mm = Zero(dt.getMinutes());
        var ss = Zero(dt.getSeconds());

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss

    }

    // 定义一个补零的方法
    function Zero(d) {
        return d > 9 ? d : '0' + d;
    }

    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }

    initTable()
    initCate()

    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) return layer, msg('获取文章列表失败！')
                var htmlStr = template('liebiao', res)
                $('tbody').html(htmlStr)
                page(res.total);
            }
        })
    }


    // 初始化文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) return layer.msg('获取分类数据失败！')
                var htmlStr = template('fenlei', res)
                $('[name=cate_id]').html(htmlStr)

                //通知layUi重新渲染表单结构
                form.render()
            }
        })
    }

    $('#form_search').on('submit', function(e) {
        e.preventDefault()

        var cate_id = $('[name=cate_id]').val();
        var state = $('[name=state]').val();

        // 为查询参数对象q 中对应的属性赋值
        q.cate_id = cate_id;
        q.state = state;

        initTable()

    })

    // 定义渲染分页的方法
    function page(total) {
        laypage.render({
            elem: 'page', //容器
            count: total, // 总数据条数
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum, // 默认哪个页面被选中
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            //分页发生切换的时候触发jump回调
            jump: function(obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        })
    }

    $('tbody').on('click', '.btnDELETE', function() {
        var len = $('.btnDELETE').length
        var id = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) return layer.msg('删除文章失败！')
                    layer.msg('删除文章成功')
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable()
                }
            })
            layer.close(index);
        });
    })
})