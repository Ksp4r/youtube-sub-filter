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

async function Run(){
    while(buttons.rerun > 0){
        while(!buttons.dButton){
            console.log('Waiting...');
            await new Promise(resolve=> setTimeout(resolve, 1000));
        }
        console.log('Push the Button!');
        buttons.dButton.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    console.log('Finished');
}

setTimeout(Run, 1000);
