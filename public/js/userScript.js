$(() => {
    const $form = $('#form');

    $form.on('submit', handleSignup)

    function handleSignup (e) {
        e.preventDefault();

        $.ajax({
            url: 'http://localhost:3000/users/',
            type:'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                'name': $("input[name=field]").val()
            })
        }).done(data => {
            if(data.success) {
                console.log(data);
                window.localStorage.setItem('name', data.result.name);
                //me shku te Indexi.
                window.location.replace('http://localhost:3000/room');
            }
        })
    }
});