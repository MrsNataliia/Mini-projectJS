// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html,
// котра має детальну інфорацію про об'єкт на який клікнули

// Стилизація проєкта -
// index.html - всі блоки з user - по 2 в рядок. кнопки/аосилвння розташувати під інформацією про user

fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => {
        console.log(users);

        for (const user of users) {
            let div = document.createElement('div');
            div.classList.add('user')

            let p = document.createElement('p');
            p.innerHTML = `ID: ${user.id}   ${user.name}`
            let button = document.createElement('button');
            button.classList.add('butDetail')
            button.innerText = `Details`

            div.append(p, button);
            document.body.appendChild(div)




            button.onclick = () => {
                location.href = `./user-details.html?userId=${user.id}`


            }
        }
    });