$(function() {
    let form = layui.form;
    let layer = layui.layer;
    $('#link_reg').on('click', () => {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click', () => {
        $('.reg-box').hide();
        $('.login-box').show();
    })

    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: (value) => {
            // console.log(value);
            let pwd = $('.reg-box  [name=password]').val();
            if (pwd !== value) return '两次密码不一致'
        }
    })
    $('#form_reg').on('submit', (e) => {
        e.preventDefault();
        let data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post(
            '/api/reguser',
            data,
            (res) => {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg("注册成功，请登录", () => {
                    $('#link_login').click();
                })
            }
        )
    })

    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        console.log($(this).serialize());
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: res => {
                console.log(res);
                if (res.status !== 0) return layer.msg('登陆失败');
                layer.msg('登陆成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })

})