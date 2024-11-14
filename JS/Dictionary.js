const result1 = document.getElementById('result')
const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en'

async function fetchword(word , event) {
	if (event.key ==='Enter') {
     result1.innerHTML =`<div class="load"> Searching ....
     
     </div>`
    if(!word){
    result1.innerHTML ="<p> Please Enter a Word to Search</p>"
    return
    }
    //console.log(word)
    
try {
    const response = await fetch(`${API_URL}/${word.trim()}`)
    const data = await response.json()
    if (data?.title) {
     result1.innerHTML =`<p> No definitions found for word : ${word} . </p>`
     return 
    }

    result1.innerHTML =''
    if (data.length >0) {
      data.forEach(item=>{
        display_Data(item)
    })
    }
    }
  catch(e){
	result1.innerHTML=`<p> An Error Occurred While Fetching The Word </p>`
	return
  }
  }
  }


function display_Data(data){
	const phonetic1 = data?.phonetic ?`<p> Phonetic : <em> ${data?.phonetic} </em>` : ''
	const word = data?.word ? `<p> Word : ${data?.word}` : ''

	const phonetic_html =data?.phonetics?.map(item => (
		`<div class="phonetics">
    <span  class="Audio" onclick="play_Audio('${item?.audio}')"> 

          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 9H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h6m0-6v6m0-6 5.419-3.87A1 1 0 0 1 18 5.942v12.114a1 1 0 0 1-1.581.814L11 15m7 0a3 3 0 0 0 0-6M6 15h3v5H6v-5Z"/>
          </svg>
      <span>${item?.text}</span>
          ${item?.audio ? `   </span>` :''}
		</div>`


		)).join('  ')

	const meaning_HTML = data?.meanings?.map(item=>(
    `<div class="meaning">
     <div class="port-of-speach"> ${item?.partOfSpeech}</div>
     ${item?.definitions?.map(defin=>(
    `<div class="definition"> - ${defin.definition}</div>
     ${defin.example? `<div class="Example"> ${defin.example}</div>` :''}
    `
    )).join()}
    </div>  `

	 )).join('')

    result1.innerHTML += ` <div class="word-info">
    <h2>${word}</h2>
    ${phonetic1}
    ${phonetic_html}
    
    </div> 
    ${meaning_HTML} `

    }

function play_Audio(url){
	const audio = new Audio(url)
	audio.play()

    }






