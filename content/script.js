
//GET Token Button Setup

function setupButton()  {
    let button_token = document.createElement("div");
    button_token.id="br_token_container"
    let element = document.createElement("button");
    element.id="br_token_button"
    element.innerText="GET TOKEN"
    element.addEventListener("click",()=>{
        handlePopup();
    })
    button_token.appendChild(element);
    document.body.appendChild(button_token);
}


// Token Viewer Popup

let br_token_popup_is_open=false;
function setupPopup()
{
    let popup_container = document.createElement("div");
    popup_container.id="br_token_popup_container";
    
    //close wrapper
    let close_wrapper = document.createElement("div");
    close_wrapper.id="br_token_close_wrapper";
    close_wrapper.addEventListener("click",handlePopup);

    //dialog box

    let dialogbox = document.createElement("div");
    dialogbox.id="br_token_dialogbox";

    dialogbox.innerHTML="<h1 style='font-weight: bolder'>Authentication Token</h1>";

    let extract_show = document.createElement("p");
    extract_show.id="br_token_token_p"
    extract_show.innerText=window.localStorage.getItem("token");

    let copy_button = document.createElement("button");
    copy_button.id="br_token_copy_button";
    copy_button.classList.add("br_button");
    copy_button.innerText="Copy";

    copy_button.addEventListener("click",handlecopy);

    let download_button = document.createElement("button");
    download_button.id="br_token_download_button";
    download_button.classList.add("br_button");
    download_button.innerText="Download";

    download_button.addEventListener("click",()=>{
        let download_text = extract_show.innerText;
        download("authentication_token_br",download_text);
    })

    //add up everything
    dialogbox.appendChild(extract_show);
    dialogbox.appendChild(copy_button);
    dialogbox.appendChild(download_button);
    popup_container.appendChild(close_wrapper);
    popup_container.appendChild(dialogbox);

    return popup_container;

}



//handle popup

function handlePopup() {

    if(!br_token_popup_is_open)
    {
        popup_child=setupPopup();
        document.body.appendChild(popup_child);
        br_token_popup_is_open=true;
    }
    else
    {
        document.body.removeChild(popup_child)
        br_token_popup_is_open=false;
    }
}



//handle the copy button

function handlecopy()
{
    navigator.clipboard.writeText(document.getElementById("br_token_token_p").innerText);
    let copybro= document.getElementById("br_token_copy_button");
    copybro.innerText="Copied";
    copybro.disabled=true;
    setTimeout(()=>{
        copybro.innerText="Copy";
        copybro.disabled=false;
    },1500)
}


//Download system for the token

let downloadUrl;

function download(filename, text) {
    const blob = new Blob([text],{
        type:"text/plain"
    })

    if(downloadUrl)
    URL.revokeObjectURL(downloadUrl);

    downloadUrl = URL.createObjectURL(blob);

    let element = document.createElement('a');
    element.setAttribute('href', downloadUrl);
    element.setAttribute('download', filename);
    
    element.style.display = 'none';
    
    element.click();
    
    
}


//Initialize the first script

if (window.localStorage.token)
{
    chrome.storage.local.get(["br_token_active"],(result)=>{
        if(result.br_token_active)
        {
            setupButton();
        }
    })
}