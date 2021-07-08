import { name } from './example-other-file';


let _button=document.querySelector('#gonder');
let _buttontamamla=document.querySelector('#tamamla');
let _hesap=document.querySelector('#Hesaplarim');
let _miktar=document.querySelector('#para');
let _iban=document.querySelector('#iban');
let _uisifre=document.querySelector('#uisifre');
var ui = document.getElementById("sifre");
var tamamla = document.getElementById("tamamla");
ui.style.display = "none";
tamamla.style.display = "none";

_button.disabled = true;

//select yapıldıgında çalışsacak kısım
_hesap.addEventListener('change', function(){
    _button.disabled=false;
    timerBaslat();
});
_miktar.addEventListener('change',function(){
    _button.disabled=false;
    //timerBaslat();
     });
    

_iban.addEventListener('change',function(){
    _button.disabled=false;
    //timerBaslat(); 
});



//button tıklandığında kontroller yapılacak
_button.addEventListener('click', paraGonder);
_buttontamamla.addEventListener('click', sifreKontrol);

let sifretekrar = 0;



const dakika = document.getElementById("dakika");
const saniye = document.getElementById("saniye");
let dur = false;




//kontrol kısmı ve fonksiyon
function paraGonder(){
    let _hesap=document.querySelector('#Hesaplarim');

    if(_hesap.hasAttribute('required') && _hesap.value == 0){
        _button.disabled = true;
        return;
    }

    if(_miktar.value <= _hesap.value && _miktar.value < 500 )
        {
        //bakiyeKontrol();
        let _yeni=Number(_hesap.value)-Number(_miktar.value);
        _hesap.options[_hesap.options.selectedIndex].setAttribute("value",_yeni);
        _hesap.options[_hesap.options.selectedIndex].innerHTML="Kullanılabilir Limit = " +(_yeni).toString();
        console.log(_hesap.value);
        alert("Havale Başarılı Gönderilen Miktar = " +_miktar.value);
        
        
        
        }
    else if(_miktar.value <= _hesap.value && _miktar.value > 500)
        {
            let _yeni=Number(_hesap.value)-Number(_miktar.value);
            _hesap.options[_hesap.options.selectedIndex].setAttribute("value",_yeni);
            alert("Telefonunuza gelen şifreyi girin");
            ui.style.display = "block";
            tamamla.style.display = "block";
            _button.style.display = "none";
            
            //sifreKontrol();
        }
    else if(_miktar.value > _hesap.value)
        {
            alert("Yetersiz Bakiye");

        }


}

function bakiyeKontrol(){
    if(_miktar.value > _hesap.value){
        alert("Bakiyeniz yetersiz");
        _button.disabled = true;
    }
    else{
        _button.enabled = true;
        
    }
}

function timerBaslat(){
    
    let dk = dakika.textContent;
    let sn = saniye.textContent;

    const interval = setInterval(() =>{
        sn--;
        sn = sn < 10 ? "0" + sn : sn;
        if(sn == "0-1"){
            dk--;
            sn = 59;
        }
        dakika.textContent = dk;
        saniye.textContent = sn;

        if(dk == 0 && sn == 0)
        {
            clearInterval(interval);
            alert("Süreniz Dolmuştur İşleminiz Onaylanmadı !")
            window.location.reload();
        }
        
        if(dur){
            clearInterval(interval);
            return;
        }
        

        
    }, 1000)
}



function sifreKontrol(){
    if(_uisifre.value == 1234)
    {
        bakiyeKontrol();
        let _yeni=Number(_hesap.value)-Number(_miktar.value);
        _hesap.options[_hesap.options.selectedIndex].setAttribute("value",_yeni);
        _hesap.options[_hesap.options.selectedIndex].innerHTML="Kullanılabilir Limit = " +(_yeni).toString();
        console.log(_hesap.value);
        alert("Havale Başarılı Gönderilen Miktar = " +_miktar.value);
        ui.style.display = "none";
        tamamla.style.display = "none";
        _button.style.display = "block";
        _uisifre.value = "";
        //window.location.reload();
    }
    else 
    {
        if(sifretekrar < 3)
        {
        alert("Şifreniz Yanlış");
        sifretekrar++;
        }
        else
        {
            alert("Hesap Bloke ! ")
            window.location.reload();
        }
  
    }
  
}