export function RetiraAssentos (str) {
    var com_acento = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
    var sem_acento = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";

    var novastr="";
    for(let i=0; i<str.length; i++) {
        var troca=false;
        for (let a=0; a<com_acento.length; a++) {
            if (str.substr(i,1) === com_acento.substr(a,1)) {
                novastr+=sem_acento.substr(a,1);
                troca=true;
                break;
            }
        }
        if (troca === false) {
            novastr+=str.substr(i,1);
        }
    }
    return novastr;
}