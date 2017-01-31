exports.contact = (data) => {
    if (data.phone !== '') {
        return (
            `<div>
                <p>Envoyé depuis la page contact</p>
                <p>Name: ${data.name}</p>
                <p3>Entreprise: ${data.entreprise}</p>
                <p>Ville: ${data.city}</p>
                <p>Mail: ${data.sender}</p>
                <p>Téléphone: ${data.phone}</p>
                <div>${data.content}</div>
            </div>`
        )
    } else {
        return (
            `<div>
                <p>Envoyé depuis la page contact</p>
                <p>Name: ${data.name}</p>
                <p3>Entreprise: ${data.entreprise}</p>
                <p>Ville: ${data.city}</p>
                <p>Mail: ${data.sender}</p>
                <div>${data.content}</div>
            </div>`
        )
    }
}