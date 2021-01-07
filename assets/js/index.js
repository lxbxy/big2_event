$(function() {
    let layer = layui.layer
        // 获取用户基本信息
    getUserInfo()
    $('#btnLogout').on('click', function() {
        layer.confirm('确认退出?', { icon: 3, title: '提示' }, function(index) {
            //do something
            layer.close(index);
            localStorage.removeItem('token')
            location.href = '/login.html'
        });

    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: (res) => {
                // console.log(res);
                if (res.status !== 0) return layer.msg('获取用户信息失败')
                rendAvatar(res.data)
            }
            // complete: function(res) {
            //     // console.log(res);
            //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            //         localStorage.removeItem('token')
            //         location.href = '/login.html'
            //     }
            // }
    })

}

//渲染用户头像
function rendAvatar(user) {
    let name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        //安需渲染用户头像

    if (user.user_pic !== null) {
        // console.log(user);
        $('.layui-nav-img').attr('src', 'user.user_pic').show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        let first = name[0].toUpperCase();
        $('.text-avatar').html(first).show()

    }
}