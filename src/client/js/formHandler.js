import "./nameChecker.js";
async function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("name").value;
  console.log(formText);
  let formInJson = { name: formText };
  console.log("::: Form Submitted :::");
  let res = await fetch("http://localhost:8080/test", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formInJson),
  });
  let data = await res.json().then(function (res) {
    let apiIDElement = document.getElementById("apiRes");
    if (res.code == "0") {
      apiIDElement.innerHTML = "That A Valid URL Good Job👍";
      apiIDElement.style.backgroundColor = "springgreen";
      let msg = myObject.res.msg;
      let formattedRes =
        `Agreement: ${msg.agreement}<br>` +
        `Subjectivity: ${msg.subjectivity}<br>` +
        `Score Tag: ${msg.score_tag}<br>` +
        `Irony: ${msg.irony}`;

      document.getElementById("results").innerHTML = formattedRes;
    } else {
      let msg = myObject.res.msg;
      apiIDElement.innerHTML = "Something Wrong, Try a URL for an article!";
      apiIDElement.style.backgroundColor = "red";
      document.getElementById("results").innerHTML = msg;
    }
  });
}

export { handleSubmit };
