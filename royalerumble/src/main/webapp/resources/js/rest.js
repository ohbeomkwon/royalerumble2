class Rest  {
    constructor(url) {
        this.url = url;
    }

    list(params, callback) {
        $.get(this.url + params, callback)
    }

    get(id, callback) {
        $.get(this.url + '/' + id, callback)
    }

    create(data, callback) {
        console.log(this.url)
        $.ajax({
            url : this.url,
            type : 'post',
            contentType : 'application/json',
            data : JSON.stringify(data),
            success : callback
        });
    }

    update(data, callback) {
        return $.ajax({
            url : this.url,
            type : 'put',
            contentType : 'application/json',
            data : JSON.stringify(data),
            success : callback
        });
    }

    remove(id, callback) {
        return $.ajax({
            url : this.url + '/' + id,
            type : 'delete',
            success : callback
        });
    }
}