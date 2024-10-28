let form = document.querySelector('form');
let resultDiv = document.querySelector('.result');
let del =document.querySelector("#delete");
let inp=document.querySelector("input");

del.addEventListener("click",()=>{
inp.value="";
resultDiv.innerHTML = "";
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    getWordInfo(form.elements[0].value);
});

const getWordInfo = (word) => {
    async function dictionary(word) {
        let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        try {
            let res = await axios.get(url);
            console.log(res);
            const meanings = res.data[0].meanings[0].definitions;
            const partspeech = res.data[0].meanings[0].partOfSpeech;
            resultDiv.innerHTML = "";

            const heading = document.createElement('h6');
            heading.textContent = "Definition";
            resultDiv.appendChild(heading);
           
            const ul = document.createElement('ul');
            meanings.slice(0,3).forEach((definitionObj) => {
                const li = document.createElement('li');
                li.textContent = definitionObj.definition;
                ul.appendChild(li);

            });
            resultDiv.appendChild(ul);
            const heading2 = document.createElement('p');
            heading2.innerHTML =`<strong>Part of speech is</strong> ${partspeech}`;
            resultDiv.appendChild(heading2);
           
            
           
        } catch (error) {
            console.error("Error fetching the word information:", error);
           // resultDiv.innerHTML = `<p>Error fetching word information. Please try again.</p>`;
        }
    }

    dictionary(word);
}
