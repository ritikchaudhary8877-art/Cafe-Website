document.querySelector(".contact-form form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const inputs = this.querySelectorAll("input, textarea");

    const data = {
        name: inputs[0].value,
        email: inputs[1].value,
        phone: inputs[2].value,
        date: inputs[3].value,
        message: inputs[4].value
    };

    try {
        const response = await fetch("/reservation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        alert(result.message);
        this.reset();

    } catch (error) {
        alert("Something went wrong!");
        console.error(error);
    }
});
