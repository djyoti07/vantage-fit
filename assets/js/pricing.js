$(document).ready(function(){

var numberOfUsers = '';
var numberOfUsers = $(".range-slider__range").val();
var isPricingInUSD = true;
/*no of users function*/
$(".numberOfUserss").each(function(){
    $(this).text(numberOfUsers);
    $(".numberOfUserss").attr("users", numberOfUsers);
});
/*Price in boxes*/

$('.output').each(function(){ 
  var selectedPlan = $(this).attr('plan');
  $(this).html("<span>" + `${getCurrencySymbol(isPricingInUSD)}` + "</span>" + getTotalPrice(selectedPlan, isPricingInUSD, numberOfUsers ));
});


/*Price per employee*/
$('.pricePer').each(function(){
  var selectedPlan = $(this).attr('plan');
  var isPricingInUSD = true;
  $(this).find(".amountperperson").text(getPlanRate(selectedPlan, isPricingInUSD)); 
  $(".chooseplan").text(getPlanName(selectedPlan));
});

$("#subscriptionSwitch").click(function(){
  $('.tabValues').find(".active").removeClass('active');
  $(".subscriptiontab").addClass("active");
  $(".pricingpage").find(".showItem").removeClass("showItem").addClass("hideItem");
  $(".subscription").removeClass("hideItem").addClass("showItem");
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
      var numberOfUsers = event.target.value;
      $('.output').each(function(){ 
        var selectedPlan = $(this).attr('plan');
        var numberOfUsers = event.target.value;
        var isPricingInUSD = true;
        $(".noOfUsers").text(numberOfUsers);
        $(".numberOfUserss").attr("users", numberOfUsers);
        $(this).html("<span>" + `${getCurrencySymbol(isPricingInUSD)}` + "</span>" + getTotalPrice(selectedPlan, isPricingInUSD, numberOfUsers ));
        
      });
      $(".numberOfUserss").each(function(){
          var numberOfUsers = event.target.value;
          $(this).text(numberOfUsers);
      });
      if(numberOfUsers == 1000){
        $(".userLimit").show();
      }
      else {
        $(".userLimit").hide();
      }

  });
  applyFill(slider.querySelector('input'));  
});


$("#selectedNumberOfWeeks").change(function(plan,  usd, numberOfUsers) {
    var selectedNumberOfWeeks = $(this). find("option:selected"). val();
    var numberOfUsers = $(".numberOfUserss").attr("users");
    var selectedPlan = 1 ;
    var isPricingInUSD = true;
    getTotalPrice(selectedPlan, isPricingInUSD, numberOfUsers );
    $(".onetimeBox .output").html("<span>" + `${getCurrencySymbol(isPricingInUSD)}` + "</span>" + getTotalPrice(selectedPlan, isPricingInUSD, numberOfUsers ));
        
});
function getTotalPrice(plan,  usd, numberOfUsers) {
  const cost = getCost(plan, usd, numberOfUsers)
  if (cost != null) {
    return `${cost}`
  } else {
    return "Contact us"
  }
}

function getCost(plan, usd, numberOfUsers) {
  return getPricePerUserPerWeek(plan, usd) * numberOfUsers * getWeeklyOrMonthlyFactor(plan)
}
/* get price of plan*/
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
function getWeeklyOrMonthlyFactor(plan) {
  var selectedNumberOfWeeks = $("#selectedNumberOfWeeks option:selected").val();
  if (plan == 1) { return selectedNumberOfWeeks } else { return 4 }
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