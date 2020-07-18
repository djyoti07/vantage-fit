$(document).ready(function(){
  /*tabs*/
$('.tabValues li').on('click', function(){
    var currentItem = '.'+ $(this).attr('attr');
    $('.tabValues').find(".active").removeClass('active');
    $(this).addClass('active');
    $(".pricingpage").find(".showItem").removeClass("showItem").addClass("hideItem");
    $(currentItem).removeClass("hideItem").addClass("showItem");
});

var numberOfUsers = $(".range-slider__range").val();
var isPricingInUSD = true;
/*no of users function*/
$(".numberOfUserss").each(function(){
    $(this).text(numberOfUsers);
});
/*Price in boxes*/
$('.output').each(function(){ 
  var selectedPlan = $(this).attr('plan');
   $(this).text(getCurrencySymbol() + getTotalPrice(selectedPlan, isPricingInUSD, numberOfUsers ));
});
/*Price per employee*/
$('.pricePer').each(function(){
  var selectedPlan = $(this).attr('plan');
  console.log(selectedPlan);
  var isPricingInUSD = true;
  //if(isPricingInUSD){ var currency = "$";} else{ var currency = "₹";}
  $(this).find(".amountperperson").text(getPlanRate(selectedPlan, isPricingInUSD)); 
});
/*slider*/
const settings={
  fill: '#f8654a',
  background: '#f5f8fa'
}
const sliders = document.querySelectorAll('.range-slider');
Array.prototype.forEach.call(sliders,(slider)=>{
  slider.querySelector('input').addEventListener('input', (event)=>{
    //slider.querySelector('span').innerHTML = event.target.value;
      
      //console.log(event.target.value);
      applyFill(slider.querySelector('input'));
      $('.output').each(function(){ 
        var selectedPlan = $(this).attr('plan');
        var numberOfUsers = event.target.value;
        var isPricingInUSD = true;
        $(".noOfUsers").text(numberOfUsers);
        $(this).text(getCurrencySymbol() + getTotalPrice(selectedPlan, isPricingInUSD, numberOfUsers ));
        
      });
      $(".numberOfUserss").each(function(){
          var numberOfUsers = event.target.value;
          $(this).text(numberOfUsers);
      });

  });
  applyFill(slider.querySelector('input'));  
});
//var selectedPlan = 2
//var numberOfUsers = 10
//var isPricingInUSD = true
var selectedNumberOfWeeks = $("#selectedNumberOfWeeks option:selected").val();
$("#selectedNumberOfWeeks").change(function() {
var selectedNumberOfWeeks = $(this). find("option:selected"). val();
});
/*
0 = Free
1 = One time challenge
2 = Premium
3 = Enterprise
 */


/*
dummy function to test out the logic
*/
function run(selectedPlan, selectedNumberOfWeeks) {
  var selectedPlan = selectedPlan;
  var selectedNumberOfWeeks = selectedNumberOfWeeks;
  var postFix = '';
  if (selectedPlan == 1) {
    postFix = ` for ${selectedNumberOfWeeks} week(s)`
  } else {
    postFix = ` per month`
  }
  const plan = getPlanName(selectedPlan)
  const currency = getCurrencySymbol(isPricingInUSD)
  const billingValue = getTotalPrice(numberOfUsers, isPricingInUSD, selectedPlan)
  const message = `${numberOfUsers} users for ${plan} plan => ${currency}${billingValue}`
  //console.log(message + postFix)
  //console.log(getPlanRate(selectedPlan, isPricingInUSD))
}

/*price return*/
function getPricePerUserPerWeek(plan, usd) {
  if (plan == 1) {
    if (usd) { return 1 } else { return 10  }
  } else if (plan == 2) {
    if (usd) { return 1 } else { return 10 }
  } else if (plan == 3) {
    if (usd) { return 1.25 } else { return 15 }
  } else {
    return 0
  }
}
/*Plan */
function getPlanName(plan) {
  switch (plan) {
  case 0:
    return "FREE"
  case 1:
    return "One Time Challenge"
  case 2:
    return "Premium"
  case 3:
    return "Enterprise"
  }
}
/*Per employee Price*/
function getPlanRate(plan, isPricingInUSD) {
  switch (plan) {
  case 0:
    return "28-day Free Trial"
  default:
    // for one time challenge rates are per week, for others rate are monthly, to calculate monthly we consider the cost of 4 weeks
    var rateMultiplier = 1
    if (plan != 1) {
      rateMultiplier = 4
    }
    const rate = `${getCurrencySymbol(isPricingInUSD)}` + `${getPricePerUserPerWeek(plan, isPricingInUSD)*rateMultiplier} per employee`
    if (plan == 1) { return rate + "/week" } else { return rate }
  }
}

function getTotalPrice(plan,  usd, numberOfUsers) {
  const cost = getCost(plan, usd, numberOfUsers)
  if (cost != null) {
    return `${cost}`
  } else {
    return "Contact us"
  }
}

function getCurrencySymbol(usd) {
  if (usd) { return "$" } else { return "₹" }
}

function getCost(plan, usd, numberOfUsers) {
  return getPricePerUserPerWeek(plan, usd) * numberOfUsers * getWeeklyOrMonthlyFactor(plan)
}

function getWeeklyOrMonthlyFactor(plan) {
  console.log(selectedNumberOfWeeks); 
  if (plan == 1) { return selectedNumberOfWeeks } else { return 4 }
}


function applyFill(slider) {
  const percentage = 100*(slider.value-slider.min)/(slider.max-slider.min);
  const bg = `linear-gradient(90deg, ${settings.fill} ${percentage}%, ${settings.background} ${percentage+0.1}%)`;
  slider.style.background = bg;
}
/*
0 = Free
1 = One time challenge
2 = Premium
3 = Enterprise
 */
 /*
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
*/
});