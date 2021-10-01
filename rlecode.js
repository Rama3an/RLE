let arg = process.argv;
let fs = require('fs');
let inText;
let codeText = '';
let decodeText = '';
let count = 0;
let n = 1;

fs.readFile(arg[2], (err, data) => {
    if (err) {
        console.error(err);
        return;
        }
        inText = data.toString();
        for (i = 0; i < inText.length; i += count) {
            while (inText.charAt(i) == inText.charAt(i + n))// ищу кол-во повторов
			    n++;
            count = n;
            if (inText.charAt(i) != String.fromCharCode(35)){ // проверяю не #
                while (n > 259) { 
                    n -= 259;
                    codeText += String.fromCharCode(35) + String.fromCharCode(255) + inText.charAt(i);
                }
                if (n >= 4) 
                    codeText += String.fromCharCode(35) + String.fromCharCode(n - 4) + inText.charAt(i);
                if (n < 4) {
                        for(let x = 0; x < n; x++)
                            codeText += inText.charAt(i);    
                }  
                    
            }
                
            if (inText.charAt(i) == String.fromCharCode(35)){
                while (n > 255) { 
                    n -= 255;
                    codeText += String.fromCharCode(35) + String.fromCharCode(255) + inText.charAt(i);
                }
                if (n <= 255) {
                    codeText += String.fromCharCode(35) + String.fromCharCode(n) + inText.charAt(i);
                }
            }
            
            n = 1;    
        }    

    fs.writeFile(arg[3], codeText, (err) => {
        if (err) {
            console.err(err);
            return;
        }
    });


    i = 0;
    while (i < codeText.length) {
        if (codeText[i] != String.fromCharCode(35)) {
            decodeText += codeText[i];
            i++;
        }
        if ((codeText[i] == String.fromCharCode(35)) && (codeText[i + 2] != String.fromCharCode(35)))
            for (j = 0; j < codeText[i + 1].charCodeAt(0) + 4; j++)
                decodeText += codeText[i + 2];
            
        if ((codeText[i] == String.fromCharCode(35)) && (codeText[i + 2] == String.fromCharCode(35)))
            for (j = 0; j < codeText[i + 1].charCodeAt(0); j++)
                decodeText += codeText[i + 2];
            

            i += 3; 
    }
    
    fs.writeFile(arg[4], decodeText, (err) => {
        if (err) {
            console.err(err);
            return;
        }
        console.log('The files has been saved!');
    });
});

            
