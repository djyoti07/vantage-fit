$(document).ready(function(){
lozad().observe();
$('.tabValues li').on('click', function(){
    var currentItem = '.'+ $(this).attr('attr');
    $('.tabValues').find(".active").removeClass('active');
    $(this).addClass('active');
    $(".pricingpage").find(".showItem").removeClass("showItem").addClass("hideItem");
    $(currentItem).removeClass("hideItem").addClass("showItem");
});
var numberOfUsers = $(".range-slider__range").val();
var isPricingInUSD = true;
$(".numberOfUserss").each(function(){
    $(this).text(numberOfUsers);
});
const settings={
  fill: '#f8654a',
  background: '#f5f8fa'
}
$('.output').each(function(){ 
  var selectedPlan = $(this).attr('plan');
   $(this).text(getTotalPriceText(selectedPlan, isPricingInUSD, numberOfUsers ));
});
$('.pricePer').each(function(){
  var selectedPlan = $(this).attr('plan');
  if(isPricingInUSD){ var currency = "$";} else{ var currency = "₹";}
  $(this).find(".amountperperson").text(currency + getPricePerUser(selectedPlan, isPricingInUSD)); 
  });
/*
0 = Free
1 = One time challenge
2 = Premium
3 = Enterprise
 */
function getPricePerUser(plan, usd) {
  if (plan == 1) {
    if (usd) { return 3 } else { return 30  }
  } else if (plan == 2) {
    if (usd) { return 3 } else { return 30 }
  } else if (plan == 3) {
    if (usd) { return 4 } else { return 40 }
  } else {
    return 0
  }
  
}

function getTotalPriceText(plan, usd, numberOfUsers ) {
  const cost = getCost(plan, usd, numberOfUsers)
  if (cost !== null) {
    if (cost > 0) {
      if (usd) {
        return `$${cost}`
      } else {
        return `₹${cost}`
      }
    } else {
      return "FREE"
    }
  } else {
    return "Contact us"
  }
}

function getCost(plan, usd, numberOfUsers) {
  if (numberOfUsers >= 1000) {
    return null
  } else {
    return getPricePerUser(plan, usd) * numberOfUsers
  }
}
const sliders = document.querySelectorAll('.range-slider');
Array.prototype.forEach.call(sliders,(slider)=>{
  slider.querySelector('input').addEventListener('input', (event)=>{
    //slider.querySelector('span').innerHTML = event.target.value;
      
      console.log(event.target.value);
      applyFill(slider.querySelector('input'));
      $('.output').each(function(){ 
        var selectedPlan = $(this).attr('plan');
        var numberOfUsers = event.target.value;
        var isPricingInUSD = true;
        $(".noOfUsers").text(numberOfUsers);
        $(this).text(getTotalPriceText(selectedPlan, isPricingInUSD, numberOfUsers ));
        
      });
      $(".numberOfUserss").each(function(){
          var numberOfUsers = event.target.value;
          $(this).text(numberOfUsers);
      });

  });
  applyFill(slider.querySelector('input'));  
});

function applyFill(slider) {
  const percentage = 100*(slider.value-slider.min)/(slider.max-slider.min);
  const bg = `linear-gradient(90deg, ${settings.fill} ${percentage}%, ${settings.background} ${percentage+0.1}%)`;
  slider.style.background = bg;
}
});

