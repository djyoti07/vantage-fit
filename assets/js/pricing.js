jQuery(document).ready(function($){

var numberOfUsers = '';
var numberOfUsers = $(".range-slider__range").val();
var isPricingInUSD = true;
/*no of users function*/
$(".numberOfUserss").each(function(){
    $(this).text(numberOfUsers);
});
/*Price in boxes*/

$('.output').each(function(){ 
  var selectedPlan = $(this).attr('plan');
   $(this).text(getTotalPriceText(selectedPlan, isPricingInUSD, numberOfUsers ));
});


/*Price per employee*/
$('.pricePer').each(function(){
  var selectedPlan = $(this).attr('plan');
  if(isPricingInUSD){ var currency = "$";} else{ var currency = "₹";}
  $(this).find(".amountperperson").text(currency + getPricePerUser(selectedPlan, isPricingInUSD)); 
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


$("#selectedNumberOfWeeks").change(function(plan,  usd, numberOfUsers) {
    var selectedNumberOfWeeks = $(this). find("option:selected"). val();
    var numberOfUsers = $(".usersbox .numberOfUserss").text();
    var selectedPlan = 1 ;
    var isPricingInUSD = true;
    var value = getTotalPriceText(selectedPlan, isPricingInUSD, numberOfUsers);
    console.log(selectedNumberOfWeeks);
    console.log(value);
    console.log(value/selectedNumberOfWeeks);
    $(".onetimeBox .output").text(getTotalPriceText(selectedPlan, isPricingInUSD, numberOfUsers ) );
        
});
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
/* get price of plan*/
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

/*
0 = Free
1 = One time challenge
2 = Premium
3 = Enterprise
 */



/*Per employee Price*/
function getPlanRate(plan, isPricingInUSD) {
  switch (plan) {
  case '0':
    return "100 users"
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



function getCurrencySymbol(usd) {
  if (usd) { return "$" } else { return "₹" }
}
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
/*color of slider */
function applyFill(slider) {
  const percentage = 100*(slider.value-slider.min)/(slider.max-slider.min);
  const bg = `linear-gradient(90deg, ${settings.fill} ${percentage}%, ${settings.background} ${percentage+0.1}%)`;
  slider.style.background = bg;
}

/*Mobile View */
$("#subscriptionPlan .indItems.tabsViewMobile div").click(function(){
 
  var className = $(this).attr('attr');
  $("#subscriptionPlan .tableSubscription td").hide();
$("#subscriptionPlan .indItems div, #subscriptionPlan .tableSubscription div").removeClass("active");
   $("#subscriptionPlan .tableSubscription td:first-child").show();
  console.log($("#subscriptionPlan .tableSubscription" + " ."+className+"Plan").show());
  $("#subscriptionPlan .tableSubscription" + " ."+className+"Plan").show();

  
  $(this).addClass("active");
  $(".mobileView").find(".active").removeClass("active");
  $(".mobileView" + "."+className+"Plan").addClass("active");

});

/*tabs*/
$('.tabValues li').on('click', function(){
  var currentItem = '.'+ $(this).attr('attr');
  $('.tabValues').find(".active").removeClass('active');
  $(this).addClass('active');
  $(".pricingpage").find(".showItem").removeClass("showItem").addClass("hideItem");
  $(currentItem).removeClass("hideItem").addClass("showItem");
});
/*
0 = Free
1 = One time challenge
2 = Premium
3 = Enterprise


/*calculation 

1,200 = 200 * 4 = 400 (for plan 1, 200 User 2 weeks)
1,200 = 200 * 4 = 800 (for plan 1, 200 User 4 weeks)
1,200 = 200 * 4 = 1600 (for plan 1, 200 User 8 weeks)
1,200 = 200 * 4 = 2400 (for plan 1, 200 User 16 weeks)
2,200 = 1 * 200 = 200 * 4 = 800(for plan 2, 200 User)
3,200 = 1.25 *200=250 *4 = 1000(plan 3 200 users)


1,300 = 300 * 2 = 600 (plan 1 , 300 users, 2 weeks)
1,300 = 300 * 8 = 2400 (plan 1 , 300 users. 4 weks)
2,300 =1 * 300 = 300 * 4= 1200 (plan 2 , 300 users)
3,300 = 1.25 *300 =375*4=1500 ((plan 3 , 300 users))




 */

});