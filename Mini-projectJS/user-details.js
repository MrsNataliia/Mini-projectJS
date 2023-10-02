// На странице user-detail.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
// Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
// 6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу
//     про поточний пост.

//// Стилизація проєкта -
// //     user-details.html - блок з інфою про user зверху сторінки. Кнопка нижчє, на 90% ширини сторінки, по центру.
// //     блоки з короткою іфною про post - в ряд по 5 .

let url = new URL(location.href)
console.log(url)
let id= url.searchParams.get('userId')

fetch('https://jsonplaceholder.typicode.com/users/' + id)
    .then((response) => response.json())
    .then(user => {
        console.log(user)
        const div = document.getElementById('inform');
        const ul = document.createElement('ul');
        let buttonPost = document.createElement('button');
        buttonPost.innerText = `post of current user`
        buttonPost.classList.add('butPost')
        div.append(ul, buttonPost);

        recursiveBuilder(user, ul);

        buttonPost.onclick = () =>{
            let url1 = new URL(location.href)
            console.log(url1)
            let id = url1.searchParams.get('userId')
            fetch(`https://jsonplaceholder.typicode.com/posts?userId=` + id)
                .then((response) => response.json())
                .then((posts) => {
                    console.log(posts)


                    for (const post of posts) {
                        let div = document.createElement('div');
                        div.classList.add('postTitle')
                        let h3 = document.createElement('h3');
                        h3.innerHTML = `${post.title}`
                        let button = document.createElement('button');
                        button.classList.add('butComment')
                        button.innerText = `comments`
                        div.append(h3, button);
                        document.body.appendChild(div);
                        button.onclick = () => {
                            location.href = `./post-details.html?postId=${post.id}`

                        }
                    }
                })
        }

    })
function recursiveBuilder(obj, block) {
    for (const key in obj) {
        const value = obj[key];
        if (typeof value === 'object') {
            ulBuilder(key, value, block)
        } else {
            liBuilder(key, value, block);
        }
    }
}

function ulBuilder(key, value, block) {
    let li = document.createElement('li');
    let ul = document.createElement('ul');
    block.appendChild(li);
    li.appendChild(ul);
    ul.innerHTML = `<b>${key}:</b>`;
    recursiveBuilder(value, ul);
}

function liBuilder(key, value, block) {
    const li = document.createElement('li');
    li.innerHTML = `<b>${key}:</b> ${value}`
    block.appendChild(li);
}
