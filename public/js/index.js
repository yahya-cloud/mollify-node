//selecting elements
const aboutButton = document.querySelector('.homeButton');
const ctx = document.getElementById('myChart');
const cards =  document.querySelectorAll('.statCard');
const mobileNav = document.querySelector('.mobileNav__container');
const burgerIcon = document.querySelector('.burger__icon');


//initializing AOS
AOS.init({
offset: 150, 
duration: 900, 
easing: 'ease-in-out', 
once: true, 
mirror: false, 
anchorPlacement: 'top-bottom',
});

//setting animation delay on stat cards
cards.forEach((el, index) => {
    el.dataset.aosDelay = ( ((index + 1) * 300) / 2);
})

//Event listeners
if(aboutButton){
    aboutButton.addEventListener('click', () =>  
    window.scroll({
    top: 650,
    left: 0,
    behavior: 'smooth'
    })
)
}

if(burgerIcon){
    burgerIcon.addEventListener('click', () => {
        burgerIcon.classList.toggle('opened')
        mobileNav.classList.toggle('showNav')
    })
   
}

//making chart
if(ctx){
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Cases", "Active", "Deaths","Recovered" ],
            datasets:[{
                label:"people",
                data:[11210799, 5945233 ,1133291, 4811942  ],
                backgroundColor:["#EAA62C","#E84D54","#7A4A81", "#25B5F1"],
                }]
        },
        options: {
         
           
                
                layout:{
                    padding:{
                        top: 10
                    }
                },
                legend:{
                    display: false,
                    align: "center",
                    position:"bottom",
                    fontColor: "white",
                    labels:{
                        boxWidth:60,
                        fontSize:15,
                        fontColor: "#fff",
                        padding: 20
                    }
                },
                
                scales: {
                    yAxes: [{
                       ticks: {
                        min: 0,
                        }
                            }]
                },
                
                // responsive: true,
                maintainAspectRatio:false      
        }
    });
}



