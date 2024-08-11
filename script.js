// Function to get or set khodam based on input name
function getOrSetKhodam(name, data) {
    if (data.users[name]) {
        return data.users[name];
    } else {
        const newKhodam = getRandomKhodam(data.khodams);
        data.users[name] = newKhodam;
        saveData(data);
        return newKhodam;
    }
}

// Function to fetch khodams and user data
function checkKhodam() {
    const name = document.getElementById('nameInput').value.trim();
    if (name) {
        fetch('khodams.json') // fetch khodams from khodams.json
            .then(response => response.json())
            .then(khodamsData => {
                fetch('data.json')
                    .then(response => response.json())
                    .then(data => {
                        // Merge khodamsData into data object
                        data.khodams = khodamsData.khodams;
                        const khodam = getOrSetKhodam(name, data);
                        document.getElementById('result').innerText = `Your Khodam is: ${khodam}`;
                    })
                    .catch(error => {
                        document.getElementById('result').innerText = "Error fetching data.";
                        console.error('Error:', error);
                    });
            })
            .catch(error => {
                document.getElementById('result').innerText = "Error fetching khodams.";
                console.error('Error:', error);
            });
    } else {
        document.getElementById('result').innerText = "Please enter a valid name.";
    }
}

function getRandomKhodam(khodams) {
    const randomIndex = Math.floor(Math.random() * khodams.length);
    return khodams[randomIndex];
}

// Function to save the updated data back to data.json
function saveData(data) {
    fetch('save.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.text())
    .then(result => {
        console.log('Success:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
