function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let formText = document.getElementById("name").value;

    console.log("::: Form Submitted :::");

    if (Client.validURL(formText)) {
        document.getElementById("loading").innerHTML = "Loading......";
        postData("http://localhost:8080/myMeaningCloud", { url: formText }).then(function (res) {
            if (res) {
                document.getElementById("polarity").innerHTML = `Polarity: ${res.score_tag}`;
                document.getElementById("agreement").innerHTML = `Agreement: ${res.agreement}`;
                document.getElementById("subjectivity").innerHTML = `Subjectivity: ${res.subjectivity}`;
                document.getElementById("confidence").innerHTML = `Confidence: ${res.confidence}`;
                document.getElementById("irony").innerHTML = `Irony: ${res.irony}`;
                document.getElementById("loading").innerHTML = "";
            }
        });
    } else {
        alert("Please Enter A Valid URL");
    }
}

// Function to post Data
const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

export { handleSubmit };
