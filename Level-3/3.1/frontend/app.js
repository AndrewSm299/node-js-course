const Button = {
    Plus: "Plus",
    Minus: "Minus"
};

document.addEventListener('DOMContentLoaded', () => {
    const plus = document.getElementById('Plus');
    const Pluscounter = document.getElementById("Pluscounter");
    const minus = document.getElementById('Minus');
    const Minuscounter = document.getElementById("Minuscounter");

    plus.addEventListener('click', () => {
        fetch('http://localhost:3000/counter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ option: Button.Plus }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            Pluscounter.textContent = data[1];
            Minuscounter.textContent = data[0];
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    });

    minus.addEventListener('click', () => {
        fetch('http://localhost:3000/counter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ option: Button.Minus }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            Pluscounter.textContent = data[1];
            Minuscounter.textContent = data[0];
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    });
});
