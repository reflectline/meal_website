const postData = async (url, data) => {          // Асинхронная функция для отправки POST-запроса по указанному URL с переданными данными
    const res = await fetch(url, {              // Выполняем запрос с помощью fetch и ожидаем ответ от сервера
        method: 'POST',                                        // Метод запроса: POST (отправка данных)
        headers: {'Content-type': 'application/json'},         // Заголовок, указывающий, что тело запроса — JSON
        body: data                                             // Тело запроса — строка JSON
    })

    return await res.json()                                    // Ждём и возвращаем ответ в формате JSON
}

async function getResource(url) {
    let res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Could not fetch: ${url}, status: ${res.status}`);
    }

    return await res.json()
}


export {postData}
export {getResource}