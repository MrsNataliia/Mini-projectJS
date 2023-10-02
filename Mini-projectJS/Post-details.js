//     На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)
// Стилизація проєкта -
//     post-details.html - блок з інфою про пост зверху. Коментарі - по 4 в ряд.
//     Всі елементи котрі характеризують users, posts, comments візуалізувати, так, щоб було видно що це блоки (дати фон. марджини і тд)
//
let url = new URL(location.href)
console.log(url)
let id = url.searchParams.get('postId')


fetch('https://jsonplaceholder.typicode.com/posts/'+id)
    .then((response) => response.json())
    .then(post =>{ console.log(post)
        let div = document.createElement("div")
        div.classList.add('post')
        let h3 = document.createElement('h3')
        h3.innerText =`${post.title}`
        let p = document.createElement('p')
        p.innerText =`${post.body}`
        let h6 = document.createElement('h6')
        h6.innerText = `User ID : ${post.userId}     Post ID : ${post.id}`

        div.append(h3,p, h6)
        document.body.appendChild(div)


        fetch('https://jsonplaceholder.typicode.com/comments?postId='+id)
            .then((response) => response.json())
            .then(comments =>{ console.log(comments)
                for (const comment of comments){
                    let div1 = document.createElement('div')
                    div1.classList.add('comments')
                    let p = document.createElement('p')
                    p.innerText = `${comment.body}`
                    let h5 = document.createElement('h5')
                    h5.innerText = `${comment.name}`
                    div1.append(p,h5)
                    document.body.appendChild(div1)

                }
            });


    });
