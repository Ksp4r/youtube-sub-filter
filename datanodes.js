const buttons = {
    get dButton(){
        let barray = Array.from(document.querySelectorAll('button'));
        let cont = barray.find(b=> b.textContent.toLowerCase().includes('continue to download'));
        let download = barray.find(b => b.textContent.toLowerCase().includes("standard speed"));
        if (cont){
            this.rerun = 2;
            return cont;
        }
        if (download){
            this.rerun -= 1;
            return download;
        }
        return null;
    },
    rerun: 2,
}

function check(){
    if (buttons.dButton){
        console.log('Push the Button!');
        buttons.dButton.click();
        if (buttons.rerun > 0){
            return setTimeout(check, 1000);
        }
    } else {
        console.log('Waiting...');
        return setTimeout(check, 1000);
    }
    console.log('Finished');
    return;
}

setTimeout(check, 1000);
