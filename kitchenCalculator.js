// ********************************************************************
// KITCHEN Calculator Version 1.0
// ********************************************************************


const projectManagementFactor= 1.00; // Global factor that will apply to equally to each room calculator. // Can be set by Admin to any level from 0% (1.00) up to 100% (2.00), ex. 1.15 = 15% project management fee added at final calc
const kitchenDiscountInflationFactor= 1.00; // Acute factor that will apply to only Kitchen Calculations. Can be set by admin. Can be used to inflate or discount a certain calculator type. (i.e. if set to 0.95 = 5% discount on living room calculations)

let roomTypeName=""; // store label pertaining to type, as to whether it includes a dining room (i.e. Kitchen; Kitchen/Dining Room)
let roomTypeNameSingular=""; //initalized same as roomTypeName, but is not changed based on closets, etc (used for final string printouts)
let floorLevelName=""; // store label pertaining to what floor level of house this room is located

let yearBuilt=""; // year house was built, selected by user

let yearBuiltFactor=1.00; // multiplying factor based on year house was built.
let chimneyLevelFactor=1.00; // multiplying factor used for determining price of removing chimney
let plumbingLevelFactor=1.00; // multiplying factor related to cost to rough-in plumbing based on which floor level located
let windowLevelFactor=1.00; // multiplying factor related to cost to install windows based on which floor level located
let floorProtectionMaskingLevelFactor=1.00; // multiplying factor related to floor level of project (if not on main floor, assumes masking of staircase/hall will be required)

let kitchenSizeSF=0; // size of kitchen area only, expressed in square feet
let diningSizeSF=0; // size of dining room/area only, expressed in square feet
let roomSizeSF=0; // size of total Kitchen (and Dining Room if applicable) expressed in square feet. Excludes closets & staircases. Increased if wall removal causes enlargement. Equals size of Kitchen only, as 0 SF of dining added if dining not included
let additionalWalkInPantrySpaceSF=0; // additional space not considered in kitchen/dining overall square footage, but applies to additional flooring, painting, baseboards, etc.

let kitchenSizeFactor=1.00; // general multiplying factor which is an expression of overall kitchen size
let roomWallFactor=1.00; // multiplying factor that will be used for single wall calculations, instances where Square footage does not really apply
let ceilingFactor=1.00; // ceiling height & type multiplying factor

// Final costs calculated from each question:

let wallRemovalFinalCost=0; // Final Cost for WALL REMOVAL
let changeKitchenLayoutFinalCost=0; // Additional costs for drywall, electrical, and plumbing if applicable
let constructNewPantryFinalCost=0;
let windowFinalCost=0; // Final Cost for WINDOWS
let exteriorDoorFinalCost=0; // Final Cost for EXTERIOR DOORS 
let interiorDoorFinalCost=0; // Final Cost for INTERIOR DOORS
let cabinetsFinalCost=0;
let countertopFinalCost=0;
let backsplashFinalCost=0;
let sinkFinalCost=0;
let faucetFinalCost=0;
let dishwasherFinalCost=0;
let garburatorFinalCost=0;
let fridgeLineFinalCost=0;
let rangeHoodFinalCost=0;
let cookTopFinalCost=0;
let wallOvenFinalCost=0;
let gasLineConnectionFinalCost=0; // Final cost to rough-in and/or connect gas appliances, including permits
let ceilingFinalCost=0; // Final Cost for CEILING REFINISHING 
let flooringFinalCost=0; // Final Cost for FLOORING 
let mouldingsFinalCost=0; // Final Cost for MOULDINGS & MILLWORK 
let railingsFinalCost=0; // Cost for railings not part of a stairwell (remove, replace, refinish, paint, convert to pony wall, etc)
let lightingFinalCost=0; // Final Cost for LIGHTING 
let electricalFinalCost=0;
let paintingFinalCost=0; // Final Cost for PAINTING 
let designerFinalCost=0; // Final Cost for DESIGN HELP 

// Other general costs to apply:
let generalDisposalCost=0;
let floorProtectionMaskingCost=0;
let finalCleaningCost=0;

// Stores sum of all cost calculations. Raw total before designerFee & before final factors applied:
let roomSum=0;


// ********************************************************************
// ***** QUESTION # 01 to user - FLOOR LEVEL *****
// ********************************************************************

floorLevelName = window.prompt("On what floor level is this Kitchen located? (options: upper level, main level, lower level, basement level)", "--please select--"); 
  
  if (floorLevelName === "upper level") {
      chimneyLevelFactor= 1.00;
      plumbingLevelFactor=1.08;
      windowLevelFactor=1.07; // upper level windows cost 7% more to replace than main level windows
      floorProtectionMaskingLevelFactor=1.20;
  }
  else if (floorLevelName === "main level") {
      chimneyLevelFactor= 1.50;
      plumbingLevelFactor=1.00;
      windowLevelFactor=1.00; // neutral cost of window replacement set to main floor level
      floorProtectionMaskingLevelFactor=1.00;
  }
  else if (floorLevelName === "lower level") {
      chimneyLevelFactor= 2.00;
      plumbingLevelFactor=1.12; // 12% increase mainly for concrete & excavation work required drains
      windowLevelFactor=0.95; // 5% less than main level windows
      floorProtectionMaskingLevelFactor=1.10;
  }    
  else if (floorLevelName === "basement level") {
      chimneyLevelFactor= 2.25;
      plumbingLevelFactor=1.15; // 15% increase mainly for concrete & excavation work required drains
      windowLevelFactor=0.85; // basement windows are ~ 15% less than main level windows
      floorProtectionMaskingLevelFactor=1.15;
  }
  else {
      console.log("Invalid Input");
  };


// ********************************************************************
// ***** QUESTION # 02 to user - YEAR HOUSE BUILT *****
// ********************************************************************

  // should be displayed as a drop down list starting with --please select--, 2020s; 2010s; 2000s; 1990s; 1980s; 1970s; 1960s; 1950s; 1940s; 1930s; 1920s; 1910s; 1900s; Pre 1900;
  // should be pre-selected after one room is calculated in multiple room calculations, but still have option to change (in case it's an addition, or a room that was drastically altered in a different year)
  
  yearBuilt = parseInt(window.prompt("Approximately what year was this home built?", "--please select--"))

  if (yearBuilt > 2019){
    yearBuiltFactor= 1.00; // neutral for homes built in 2020s
  }
  else if (yearBuilt > 2009 && yearBuilt < 2020){
    yearBuiltFactor= 1.03; // 3% higher for homes built in 2010s
  }
  else if (yearBuilt > 1999 && yearBuilt < 2010){
    yearBuiltFactor= 1.06; // 6% higher for homes built in 2000s
  }
  else if (yearBuilt > 1989 && yearBuilt < 2000){
    yearBuiltFactor= 1.10; // 10% higher for homes built in 1990s
  }
  else if (yearBuilt > 1979 && yearBuilt < 1990){
    yearBuiltFactor= 1.14; // 14% higher for homes built in 1980s
  }
  else if (yearBuilt > 1969 && yearBuilt < 1980){
    yearBuiltFactor= 1.18; // 18% higher for homes built in 1970s
  }
  else if (yearBuilt > 1959 && yearBuilt < 1970){
    yearBuiltFactor= 1.22; // 22% higher for homes built in 1960s
  }
  else if (yearBuilt > 1949 && yearBuilt < 1960){
    yearBuiltFactor= 1.26; // 26% higher for homes built in 1950s
  }
  else if (yearBuilt > 1939 && yearBuilt < 1950){
    yearBuiltFactor= 1.30; // 30% higher for homes built in 1940s
  }
  else if (yearBuilt > 1929 && yearBuilt < 1940){
    yearBuiltFactor= 1.34; // 34% higher for homes built in 1930s
  }
  else if (yearBuilt > 1919 && yearBuilt < 1930){
    yearBuiltFactor= 1.38;  // 38% higher for homes built in 1920s
  }
  else if (yearBuilt > 1909 && yearBuilt < 1920){
    yearBuiltFactor= 1.40; // 40% higher for homes built in 1910s
  }
  else if (yearBuilt > 1899 && yearBuilt < 1910){
    yearBuiltFactor= 1.40; // 40% higher for homes built in 1900s
  }
  else if (yearBuilt < 1900){
    yearBuiltFactor= 1.40; // 40% higher for homes built pre 1900s
  }
  else{
    console.log("Invalid Selection")
  }


// ********************************************************************
// ***** QUESTION # 03 to user - INCLUDE DINING ROOM/AREA? *****
// ********************************************************************  

let includeDiningTrue=""; // yes or no
let separateDiningTrue=""; // Is dining room mainly integrated with kitchen, or mainly/fully its own area/room?

includeDiningTrue= window.prompt("Will a dining room/area be included as part of this kitchen renovation? (Options: Yes; No - Kitchen only)", "")

   if (includeDiningTrue === "yes"){
    roomTypeName= "Kitchen/Dining Area";    
   }
   else if (includeDiningTrue === "No - Kitchen only"){
    roomTypeName= "Kitchen";   
   }

roomTypeNameSingular= roomTypeName;   

// ********************************************************************
// ***** QUESTION # 04 to user - ROOM SIZE *****
// ********************************************************************

  // User should be asked to enter square footage between 60 to 600 inclusive
  // User should also be given option to select "Not Sure", at which point they should be given selections of Tiny, small, average, large, extra large, huge

  let size=0; // store user input regarding size of Kitchen Only in Square Feet. Must be between 60 and 600 inclusive.
  let notSure=false; 
    while(size<60 || size>600){
     size = parseInt(window.prompt("Please enter the current approximate size of this Kitchen (Excluding dining room/area): (min 60, max 600)", "")); // _____ Square Feet // *Also should have radio button option of "Not Sure" just below
     if (size < 60 || size >600) {
          console.log("Please enter a square footage from 60 to 600")
  }
  }
  if (notSure===false){
    kitchenSizeSF= size;
  }
   else { // to execute if "Not Sure" is selected by user
      let relativeSize = window.prompt("What is the current relative size of this Kitchen (Excluding dining room/area)? (Options: Tiny; Small; Average; Large; Extra Large; Huge)", "")
      
      if (relativeSize === "Tiny"){
        kitchenSizeSF= 70;
      } 
      else if (relativeSize === "Small"){
        kitchenSizeSF= 100;
      } 
      else if (relativeSize === "Average"){
        kitchenSizeSF= 140;
      } 
      else if (relativeSize === "Large"){
        kitchenSizeSF= 170;
      } 
      else if (relativeSize === "Extra Large"){
        kitchenSizeSF= 200;
      }
      else if (relativeSize === "Huge"){
        kitchenSizeSF= 280;
      }
      else {
        console.log("Invalid Selection")
      }
    }    

  
  // roomWallFactor is a calculated factor that will be used for single wall calculations, i.e. instances where overall square footage makes less sense. 
  // Set to neutral value of 1.00 when living room size is === 256 Square Feet. Assumes a smaller wall feature wall as square footage drops below 256, and larger as square footage moves above 256 SF.
  roomWallFactor=((kitchenSizeSF-144)*0.00125)+1; 
  if (roomWallFactor > 1.50){
    roomWallFactor = 1.50; // assign max value of 1.50 to roomWallFactor for kitchens
  }

// ASSIGN VALUE OF kitchenSizeFactor:
kitchenSizeFactor= (kitchenSizeSF / 180) + 0.222;
  if (kitchenSizeFactor > 1.50){
    kitchenSizeFactor= 1.50; // Assign max value of 1.50
  } 
  else if (kitchenSizeFactor < 0.85){
    kitchenSizeFactor= 0.85; // Assign min value of 0.85
  }  


// ***** ADD IN SIZE OF DINING ROOM IF APPLICABLE: *****
if (includeDiningTrue === "Yes"){
  // User should be asked to enter square footage between 50 to 500 inclusive
  // User should also be given option to select "Not Sure", at which point they should be given selections of Tiny, small, average, large, extra large, huge

  let size=0; // store user input regarding size of Dining room/area Only in Square Feet. Must be between 60 and 600 inclusive.
  let notSure=false; 
    while(size<50 || size>500){
     size = parseInt(window.prompt("Please enter the current approximate size of the dining room/area: (min 50, max 500)", "")); // _____ Square Feet // *Also should have radio button option of "Not Sure" just below
     if (size < 50 || size >500) {
          console.log("Please enter a square footage from 50 to 500")
  }
  }
  if (notSure===false){
    diningSizeSF= size;
  }
   else { // to execute if "Not Sure" is selected by user
      let relativeSize = window.prompt("What is the current relative size of the dining room/area? (Options: Tiny; Small; Average; Large; Extra Large; Huge)", "")
      
      if (relativeSize === "Tiny"){
        diningSizeSF= 60;
      } 
      else if (relativeSize === "Small"){
        diningSizeSF= 80;
      } 
      else if (relativeSize === "Average"){
        diningSizeSF= 100;
      } 
      else if (relativeSize === "Large"){
        diningSizeSF= 140;
      } 
      else if (relativeSize === "Extra Large"){
        diningSizeSF= 288;
      } 
      else if (relativeSize === "Huge"){
        diningSizeSF= 400;
      }
      else {
        console.log("Invalid Selection")
    }
 }    
}

// ***** ASSIGN VALUE OF roomSizeSF:
roomSizeSF= kitchenSizeSF + diningSizeSF;


// ********************************************************************
// ***** QUESTION # 05 to user - CEILING HEIGHT *****
// ********************************************************************

  // User should be asked "What is the approximate ceiling height of your existing ${roomTypeName}?"
  // User should be given a selection menu starting with -- please select--, with choices listed
  // User should also be given option to select "Not Sure", at which point value of 8.5 will be assigned (most homes are 8' or 9' high, so assumes average)

  let ceilingHeight= window.prompt("What is the approximate ceiling height of this ${roomTypeName}: (Options: 7; 8; 9; 10; 11; 12+; 16+; Not Sure):", ""); // ____ Feet High
  if (ceilingHeight === "Not Sure"){
      ceilingHeight= 8.5; // assign a value to ceilingHeight to be used in later calculations
      ceilingFactor= 1.05;
    }
  else {
     ceilingHeight=parseInt(ceilingHeight)
    if (ceilingHeight === 7){
        ceilingHeight= 8; // assign minimum height of 8 feet for doing calculations
        ceilingFactor= 1.00;
    }
    else if (ceilingHeight === 8){
        ceilingFactor= 1.00;
    }
    else if (ceilingHeight === 9){
        ceilingFactor= 1.15;
    }
    else if (ceilingHeight === 10){
        ceilingFactor= 1.35;
    }
    else if (ceilingHeight === 11){
        ceilingFactor= 1.45;
    }
    else if (ceilingHeight === 12){
        ceilingFactor= 1.60;
    }
    else if (ceilingHeight === 16){
        ceilingFactor= 2.05;
    }
    else {
        console.log("Invalid Selection");
    }    
};


// ********************************************************************
// ***** QUESTION # 06 to user - CEILING VAULTED? *****
// ********************************************************************

let vaultFactor=1.00; // another factor to be used for better precision with ceilingFactor. Value will remain neutral 1.00 if "no" is selected by user:
let vaultTrue = window.prompt("Is this ${roomTypeName} ceiling vaulted? (options: yes, no, not sure)", "");

if (vaultTrue === "yes") {
  vaultFactor=1.25 // will add 25% to overall value of ceilingFactor if ceiling is indeed vaulted
}
else if (vaultTrue === "not sure") {
  vaultFactor = 1.08 // Will add 8% to overall value of ceilingFactor
} 
else if (vaultTrue !== "no"){
    console.log("Invalid Selection");
}

ceilingFactor = (ceilingFactor * vaultFactor); // multiply the currently stored value of ceilingFactor by vaultFactor


// ********************************************************************
// ***** QUESTION # 07 to user - WALL REMOVAL *****
// ********************************************************************

const removeLoadBearingWallPrice= 6800.00; 
const removeNonLoadBearingWallPrice= 1250.00;

const removeMetalChimneyPrice= 600.00; // Price to remove a metal chimney for 1 storey of flooring in average conditions
const removeBrickChimneyPrice= 1500.00; // Price to remove a brick chimney for 1 storey of flooring in average conditions

let removeWallCost=0; // if removeWallTrue === "no", removeWallCost will remain at $0.00

let removeWallTrue="";
let loadBearingTrue="";
let floorAboveTrue="";

let removeChimneyTrue="";
let brickChimneyTrue="";
let removeChimneyCost=0;

let expandRoomSizeTrue="";

let floorAboveFactor=1.00;

let extraRoomSizeSF=0;

removeWallTrue = window.prompt("Will any interior wall(s) need to be removed or relocated in this ${roomTypeName}? *Note: Do NOT re-include common walls already considered in a previous room estimate (options: yes, no)", "");
  if (removeWallTrue === "yes"){
    loadBearingTrue = window.prompt("Do you expect any wall(s) to be load bearing? (options: yes, no, not sure)", "")
      if (loadBearingTrue === "yes"){
        if (floorAboveTrue === "yes"){
          floorAboveFactor= 1.12; // add 12% to overall cost of removing load bearing wall if there is another floor level existing above any load bearing wall(s) to be removed
        }
        removeWallCost = removeLoadBearingWallPrice * floorAboveFactor * ((yearBuiltFactor+1)/2);
        }
      else if (loadBearingTrue === "no"){
        removeWallCost= removeNonLoadBearingWallPrice;
        }
      else if (loadBearingTrue === "not sure"){
        if (floorLevelName === "basement level" && yearBuiltFactor< 1.26){  // i.e. built in 1960's or newer
          removeWallCost= removeNonLoadBearingWallPrice;
        }
        else if (yearBuiltFactor> 1.10){ // i.e. built before 1990
          removeWallCost= removeNonLoadBearingWallPrice * 2; // double price if built 1989 or earlier than for a definite non-load bearing wall removal price  
        }
        else {
          removeWallCost= removeNonLoadBearingWallPrice * 1.25; // 25% Higher if built 1990 or newer
         }  
        }
      else {
          console.log("Invalid Input")
      }

    removeChimneyTrue= window.prompt("Do you expect any wall(s) to contain a chimney that will also need to be removed? (options: yes, no, not sure)", "")
      if (removeChimneyTrue === "yes"){
        brickChimneyTrue= window.prompt("Was this chimney constructed using bricks? (options: yes, no, not sure)", "")
          if (brickChimneyTrue === "yes"){
            removeChimneyCost= removeBrickChimneyPrice * ((yearBuiltFactor+1)/2) * chimneyLevelFactor * ceilingFactor;
          }
          else if (brickChimneyTrue === "no"){
            removeChimneyCost= removeMetalChimneyPrice * ((yearBuiltFactor+1)/2) * chimneyLevelFactor * ceilingFactor; 
          }
          else if (brickChimneyTrue === "not sure"){
            removeChimneyCost= removeMetalChimneyPrice * 1.25 * ((yearBuiltFactor+1)/2) * chimneyLevelFactor * ceilingFactor;  // 25% higher than standard metal chimney price if "not sure" selected by user
          }
          else {
            console.log("Invalid Selection");
          }
      }  

    wallRemovalFinalCost= (removeWallCost * yearBuiltFactor * roomWallFactor * ceilingFactor) + removeChimneyCost; // Calculates cost to remove / relocate wall if required // Note yearBuiltFactor is used multiple times in load bearing walls which is correct

// *** Selection options for next question:
    //1. Yes, the designated size of this ${roomTypeName} will increase from the initial size specified.
    //2. No, the designated size of this ${roomTypeName} will not significantly increase. A more 'open concept' is the main objective.

expandRoomSizeTrue = window.prompt("Will removal of the wall(s) increase the overall size of this ${roomTypeName}? (Options: yes; no", ""); // Add "?" hover here
  if (expandRoomSizeTrue === "yes"){
     let notSure2=false;
     let expandSize=0; 
  while(expandSize<10 || expandSize>600){
    expandSize = parseInt(window.prompt("Please enter the approximate amount of square footage that will be added to this ${roomTypeName}: (min 10, max 600, not sure):", "")); // should also have option of "not sure"
   if (expandSize <10 || expandSize >600) {
        console.log("Please enter a square footage from 10 to 600")
    }
   } 
   if (notSure2===false){
    extraRoomSizeSF=expandSize;
   }
   else { // this else block should execute if user selects "not sure":
     let roomSizePercentLarger = window.prompt("Approximately how much larger will this ${roomTypeName} get? (Approximately 10% larger; Approximately 25% larger; Approximately 50% larger; Approximately 75% larger; Approximately Double the size)", "")
      if (roomSizePercentLarger === "Approximately 10% larger") {
        extraRoomSizeSF=(roomSizeSF*0.10); 
      } // assigns 10% of the value of roomSizeSF to extraRoomSizeSF
      else if (roomSizePercentLarger === "Approximately 25% larger") {
        extraRoomSizeSF=(roomSizeSF*0.25); 
      } // assigns 25% of the value of roomSizeSF to extraRoomSizeSF
      else if (roomSizePercentLarger === "Approximately 50% larger") {
        extraRoomSizeSF=(roomSizeSF*0.50); 
      } // assigns 50% of the value of roomSizeSF to extraRoomSizeSF
      else if (roomSizePercentLarger === "Approximately 75% larger") {
        extraRoomSizeSF=(roomSizeSF*0.75); 
      } // assigns 75% of the value of roomSizeSF to extraRoomSizeSF
      else if (roomSizePercentLarger === "Approximately Double the size") {
        extraRoomSizeSF=roomSizeSF;
      } // // assigns 100% of the value of roomSizeSF to extraRoomSizeSF
      else {
        console.log("Invalid Input");
      }
    }
    roomSizeSF= roomSizeSF + extraRoomSizeSF; // Adds the additional square footage from the expansion on to existing value of overall square footage of roomSizeSF
    roomWallFactor=((roomSizeSF-144)*0.00125)+1 // Re-calculates roomWallFactor based on adding in extraRoomSizeSF square footage, if applicable
    if (roomWallFactor > 1.50){
      roomWallFactor = 1.50; // Still assign max value of 1.50 to livingWallFactor
    }
 } 
} // End of removeWallTrue === "yes"


// ********************************************************************
// ***** QUESTION # 08 to user - LAYOUT *****
// ********************************************************************

const changeKitchenLayoutPrice= 999.99;  // Price to remove drywall, R&R insulation, Install new drywall on walls, Mud & tape drywall, Prime Drywall
const relocateKitchenElectricalPrice= 999.99;  // Price to relocate kitchen electrical layout in average sized kitchen, in neutral conditions
const relocateKitchenPlumbingPrice= 999.99;  // Price to relocate kitchen plumbing layout (sink, dishwasher, water lines, venting, etc) in average sized kitchen in average/neutral conditions 

let changeKitchenLayoutTrue=""; // yes/no?
let relocateKitchenElectricalTrue="";
let relocateKitchenPlumbingTrue="";

let changeKitchenLayoutCost=0;
let relocateKitchenElectricalCost=0;
let relocateKitchenPlumbingCost=0;


if (removeWallTrue === "no"){
      if (changeKitchenLayoutTrue === "Yes"){
        changeKitchenLayoutCost= changeKitchenLayoutPrice * kitchenSizeFactor * plumbingLevelFactor * ((yearBuiltFactor+1)/2);
      
        if (relocateKitchenElectricalTrue=== "Yes"){
          relocateKitchenElectricalCost= relocateKitchenElectricalPrice * ((kitchenSizeFactor+1)/2) * ((yearBuiltFactor+1)/2);          
        }

        if (relocateKitchenPlumbingTrue === "Yes"){
          relocateKitchenPlumbingCost= relocateKitchenPlumbingPrice * plumbingLevelFactor * ((kitchenSizeFactor+1)/2) * ((yearBuiltFactor+1)/2);       
        }  
      }  
} // End of removeWallTrue === "no" section


// Only ask question about plumbing if already know wall(s) are being removed, as change layout costs and change electrical costs have already been applied as part of wall removal cost
else {
    relocateKitchenPlumbingTrue= window.prompt("Will any plumbing fixtures need to be added or relocated? (Options: Yes; No", "");
    if (relocateKitchenPlumbingTrue === "Yes"){
      relocateKitchenPlumbingCost= relocateKitchenPlumbingPrice * plumbingLevelFactor * ((kitchenSizeFactor+1)/2) * ((yearBuiltFactor+1)/2);       
    }     
}

changeKitchenLayoutFinalCost= changeKitchenLayoutCost + relocateKitchenElectricalCost + relocateKitchenPlumbingCost; 


// ********************************************************************
// ***** QUESTION # 09 to user - PANTRY/CLOSET *****
// ********************************************************************

const constructNewPantryPrice= 999.99;  // Price to frame, board, tape, and install standard shelving in average sized pantry

let containsPantryTrue=""; // Will the new kitchen contain a pantry?
let pantryPreExistingTrue=""; // Is the pantry pre-existing? or will a new pantry need to be built or relocated?
let pantryLocation="";
let pantryType="";
let pantrySize="";

let newPantrySizeFactor=1.00; // Set to neutral for average sized pantry. Used as multiplying factor based on size of new pantry to be built
let pantryFootprintFactor=1.00;  
let pantryTypeFactor=1.00; // walk-in or reach-in?
let pantryFootprint=0; // Linear footage of cabinets, counters, and splash tile occupied by pantry to be subtracted from quantity of cabinets, countertops, and splash tile (if applicable depending on type)


// containsPantryTrue= window.prompt("Will the new {roomTypeName} contain a closet pantry? (Options: yes; no", "");

if (containsPantryTrue === "yes"){
    pantryPreExistingTrue= window.prompt("Will this pantry need to be newly constructed and/or re-sized? (Options: Yes; No, the pantry is already existing and meets size/location requirements", "");
    pantryLocation= window.prompt("Where will this pantry be located? (Options: Corner between cabinets; End of cabinets; Away from cabinets; Other", "");
      if (pantryLocation === "Corner between cabinets"){
        pantryFootprint= 5.25; // 5.25 linear feet occupied by average sized corner pantry
      }
      else if (pantryLocation === "End of cabinets"){
        pantryFootprint= 2.75; // 2.75 linear feet occupied by average sized end pantry    
      }
      else if (pantryLocation === "Away from cabinets"){
        pantryFootprint= 0; // 0 linear feet occupied by average sized pantry away from cabinets  
      }
      else if (pantryLocation === "Other"){
        pantryFootprint= 1.5; // Assume 1.5 linear feet occupied by average sized "other" pantry  
      }
      else {
          console.log("Invalid Selection");
      }
    
      pantrySize= window.prompt("Please select Size of pantry? (Options: Small, Average, Large", "");
        if (pantrySize === "Small"){
            newPantrySizeFactor= 0.85;
            pantryFootprintFactor= 0.9;
        }
        else if (pantrySize === "Average"){
            newPantrySizeFactor= 1.00;
            pantryFootprintFactor= 1.00;
        }   
        else if (pantrySize === "Large"){
            newPantrySizeFactor= 1.20;
            pantryFootprintFactor= 1.10;
        }
        else {
            console.log("Invalid Selection");
        }   

      if (pantryLocation === "Away from cabinets" || pantryLocation === "Other"){
        if (pantryType === "Walk-in"){
          if (pantrySize === "Small"){
            additionalWalkInPantrySpaceSF= 20;    
          }
          else if (pantrySize === "Average"){
            additionalWalkInPantrySpaceSF= 30;    
          }
          else if (pantrySize === "Large"){
            additionalWalkInPantrySpaceSF= 40;    
          }
        }  
      }  
    
    pantryFootprint= pantryFootprint * pantryFootprintFactor;   
     
    if (pantryPreExistingTrue === "Yes"){
        constructNewPantryFinalCost= constructNewPantryPrice * newPantrySizeFactor * ((ceilingFactor+1)/2) * ((yearBuiltFactor+1)/2);    
     }    
} // End of containsPantryTrue === "yes" section  


// ********************************************************************
// ***** QUESTION # 10 to user - WINDOWS *****    
// ********************************************************************

const smallWindowPrice= 875.00;  // price to supply & install 1 small window in neutral conditions
const mediumWindowPrice= 980.00;  // price to supply & install 1 medium window in neutral conditions
const largeWindowPrice= 1250.00;  // price to supply & install 1 large window in neutral conditions

const singleWindowInstallBaseFee= 125.00;  // Base Fee - extra price added if only 1 window to install for covering overhead (helps pay for measuring, sourcing, delivery, tool set-up, etc if only 1 window)
const newWindowOpeningPrice= 1100.00  // price to create 1 new window opening or enlarge 1 existing opening (i.e. cut hole in exterior, add lintel, etc), for average sized window in average conditions

const smallWindowBlindPrice = 80.00;  // Price to supply & install 1 average grade window blind for 1 small sized window
const mediumWindowBlindPrice = 120.00;  // Price to supply & install 1 average grade window blind for 1 medium sized window
const largeWindowBlindPrice = 160.00;  // Price to supply & install 1 average grade window blind for 1 large sized window

let replaceWindowsTrue="";
let windowGrade="";
let newWindowOpeningTrue=""; // yes or no, will any of the new windows to be installed require new openings to be created?
let installWindowBlindsTrue="";
let windowBlindGrade="";

let smallWindowCount=0; // holds number of small windows to be replaced
let mediumWindowCount=0; // holds number of medium windows to be replaced
let largeWindowCount=0; // holds number of large windows to be replaced
let totalWindowCount=0; // holds total number of windows to be installed for this room
let newWindowOpeningCount=0; // holds total number of new window openings that will need to be created or enlarged (i.e. cut hole in exterior and frame lintel, including average exterior alterations, etc)
let approxWindowCount= roomSizeSF / 90; // approximates number of average sized windows in a living room. Used ONLY for calculating window treatments if windows are not being replaced. 
  if (approxWindowCount> 7){
    approxWindowCount= 7; // assign max value of 7 to approxWindowCount
  } 

let windowGradeFactor=1.00; // multiplying factor for grade of windows desired by user
let windowBlindGradeFactor=1.00  // multiplying factor for grade of windows blinds desired by user

let smallWindowCost=0;
let mediumWindowCost=0;
let largeWindowCost=0;
let newWindowOpeningCost=0; // total cost based on number of new window openings to be created
let smallWindowBlindCost=0;  
let mediumWindowBlindCost=0; 
let largeWindowBlindCost=0;
let totalWindowBlindCost=0; 

replaceWindowsTrue = window.prompt("Are you planning to install any new windows in this ${roomTypeName}? (options: yes, no)", ""); 
  if (replaceWindowsTrue === "yes"){
      smallWindowCount = parseInt(window.prompt("Please select how many small sized windows will need to be installed: (Options: 0 - 12 inclusive):", "0"))
      mediumWindowCount = parseInt(window.prompt("Please select how many medium sized windows will need to be installed: (Options: 0 - 12 inclusive):", "0"))
      largeWindowCount = parseInt(window.prompt("Please select how many large sized windows will need to be installed: (Options: 0 - 12 inclusive):", "0"))
      windowGrade = window.prompt("Please select grade of new window(s) to be installed: (options: Bronze (economy); Silver (standard); Gold (upgraded); Platinum (high end)", "--please select--"); 
      if (windowGrade === "Bronze"){
          windowGradeFactor=0.90;
      }
      else if (windowGrade === "Silver"){
        windowGradeFactor=1.00; // neutral factor for average
      }
      else if (windowGrade === "Gold"){
        windowGradeFactor=1.25;
      }
      else if (windowGrade === "Platinum"){
        windowGradeFactor=1.50;
      }
      else {
        console.log("Invalid Selection")
      } 
smallWindowCost= smallWindowCount * smallWindowPrice * windowGradeFactor * windowLevelFactor * ((yearBuiltFactor+1)/2); // multiply # of small windows by constant price per small window
mediumWindowCost= mediumWindowCount * mediumWindowPrice * windowGradeFactor * windowLevelFactor * ((yearBuiltFactor+1)/2); // multiply # of medium windows by constant price per medium window
largeWindowCost= largeWindowCount * largeWindowPrice * windowGradeFactor * windowLevelFactor * ((yearBuiltFactor+1)/2); // multiply # of large windows by constant price per large window
totalWindowCount= smallWindowCount + mediumWindowCount + largeWindowCount; // assigns total number of windows to be installed for this room

newWindowOpeningTrue = window.prompt("Will any of these new ${roomTypeName} windows require either enlargement of existing window openings, or creation of entirely new window openings? (options: yes, no)", ""); 
  if (newWindowOpeningTrue === "yes"){
    newWindowOpeningCount = parseInt(window.prompt("How many new windows will require this? (options: //select a number less than or equal to totalWindowCount)", "--please select--")); // user should be given option to choose a number from 1 up to a maximum of the value of totalWindowCount
    newWindowOpeningCost= newWindowOpeningCount * newWindowOpeningPrice * windowLevelFactor * ((yearBuiltFactor+1)/2);
  }

installWindowBlindsTrue = window.prompt("Will new window treatments (i.e. blinds) be required for these windows? (options: yes, no)", "");
  if (installWindowBlindsTrue === "yes"){
    windowBlindGrade = window.prompt("Please select grade of new window treatments: (options: Bronze (economy); Silver (standard); Gold (upgraded); Platinum (high end)", "--please select--"); 
      if (windowBlindGrade === "Bronze"){
          windowBlindGradeFactor= 0.80;
      }
      else if (windowBlindGrade === "Silver"){
        windowBlindGradeFactor= 1.00; // neutral factor for average
      }
      else if (windowBlindGrade === "Gold"){
        windowBlindGradeFactor= 1.50;
      }
      else if (windowBlindGrade === "Platinum"){
        windowBlindGradeFactor= 2.25;
      }
      else {
        console.log("Invalid Selection")
      } 
      smallWindowBlindCost= smallWindowCount * smallWindowBlindPrice * windowBlindGradeFactor;
      mediumWindowBlindCost= mediumWindowCount * mediumWindowBlindPrice * windowBlindGradeFactor;
      largeWindowBlindCost= largeWindowCount * largeWindowBlindPrice * windowBlindGradeFactor;  
      totalWindowBlindCost= smallWindowBlindCost + mediumWindowBlindCost + largeWindowBlindCost; 
  }   

windowFinalCost= smallWindowCost + mediumWindowCost + largeWindowCost + newWindowOpeningCost + totalWindowBlindCost; // calculates cost of window replacements, if applicable
if (totalWindowCount<2){
  windowFinalCost= windowFinalCost + singleWindowInstallBaseFee; // add the base install fee to total cost if only 1 window is to be installed
}
else if (totalWindowCount>3){
  windowFinalCost= windowFinalCost * 0.94; // 6% discount once installing 4 or more windows
 }  
} // End of replaceWindowsTrue === "yes"

else if (replaceWindowsTrue === "no"){ // Only ask about window treatments separately if windows are not being replaced:
  installWindowBlindsTrue = window.prompt("Will new window treatments (i.e. blinds) be required for this ${roomTypeName}? (options: yes, no)", "");
  if (installWindowBlindsTrue === "yes"){
    let windowBlindCount = window.prompt("Approximately how many {roomTypeName} windows will require new treatments? (options: 1 to 12 inclusive, 'not sure')", "");
      if (windowBlindCount === "not sure"){
        windowBlindCount= approxWindowCount;
      }
      else {
        windowBlindCount = parseInt(windowBlindCount);
      }

    windowBlindGrade = window.prompt("Please select grade of new window treatments: (options: Bronze (economy); Silver (standard); Gold (upgraded); Platinum (high end)", "--please select--"); 
      if (windowBlindGrade === "Bronze"){
          windowBlindGradeFactor= 0.80;
      }
      else if (windowBlindGrade === "Silver"){
        windowBlindGradeFactor= 1.00; // neutral factor for average
      }
      else if (windowBlindGrade === "Gold"){
        windowBlindGradeFactor= 1.50;
      }
      else if (windowBlindGrade === "Platinum"){
        windowBlindGradeFactor= 2.25;
      }
      else {
        console.log("Invalid Selection")
      } 
  
  totalWindowBlindCost= windowBlindCount * mediumWindowBlindPrice * windowBlindGradeFactor; // use the price for medium sized window blinds in this case to get an average price without asking additional window size questions
  windowFinalCost= totalWindowBlindCost; // assign value of totalWindowBlindCost as final cost for windows, as is the only cost associated with windows since windows are not being replaced in this instance
  }   
}


// ********************************************************************
// ***** QUESTION # 11 to user - REMOVE WINDOWS *****    
// ********************************************************************

const eliminateWindowPrice= 240.00; // Price to remove, dipose, frame, insulate, patch sheathing, and patch drywall for average size window in average conditions. Exterior Finishing NOT included in price

let eliminateWindowTrue="";



eliminateWindowTrue= window.prompt("Will any existing window(s) need to be permanently eliminated? (options: yes, no)", "");
 if (eliminateWindowTrue === "yes"){
  eliminateWindowQty= parseInt(window.prompt("How many windows? (options: 1-8)", ""));

  eliminateWindowCost= eliminateWindowPrice * eliminateWindowQty * ((yearBuiltFactor+1)/2);  
  
  // Add emliminate window cost into total overall price for windows:
  windowFinalCost= windowFinalCost + eliminateWindowCost;  
 }



// ********************************************************************
// ***** QUESTION # 12 to user - EXTERIOR DOORS *****
// ********************************************************************

const exteriorDoorPrice= 1680.00; // base cost for replacement of 1 average exterior door unit. Includes removal and disposal of existing. Includes lockset.
const newDoorOpeningPrice= 1200.00; // price to create or enlarge 1 new exterior door opening (i.e. cut hole in exterior, add lintel, etc)

let newDoorOpeningCost=0; // total cost based on number of new exterior door openings to be created

let exteriorDoorCount=0; // total number of exterior door units to be replaced
let newDoorOpeningCount=0; // holds total number of new exterior door openings that will need to be created or enlarged (i.e. cut hole in exterior and frame lintel, including average exterior alterations, etc)

let replaceExteriorDoorsTrue="";
let newDoorOpeningTrue=""; // yes or no, will any of the new exterior doors to be installed require new or enlarged openings to be created?
let exteriorDoorGrade="";

let exteriorDoorGradeFactor=1.00; // grade of exterior door to be multiplied by count of door units

replaceExteriorDoorsTrue = window.prompt("Are you planning to install any new exterior man door units in this ${roomTypeName}? (options: yes, no)", "");
  if (replaceExteriorDoorsTrue === "yes"){
      exteriorDoorCount = parseInt(window.prompt("How many new exterior door units will need to be installed? *Please include exterior doors for entranceway(s) common to this ${roomTypeName} if applicable: (Options: 1 to 8 inclusive)", "-- please select--"))   
      exteriorDoorGrade = window.prompt("Please select grade of new exterior door units to be installed: (options: Bronze (economy); Silver (standard); Gold (upgraded); Platinum (high end)", "--please select--"); 
      if (exteriorDoorGrade === "Bronze"){
        exteriorDoorGradeFactor=0.85;
      }
      else if (exteriorDoorGrade === "Silver"){
        exteriorDoorGradeFactor=1.00; // Neutral factor for standard grade doors
      }
      else if (exteriorDoorGrade === "Gold"){
        exteriorDoorGradeFactor=1.35;
      }
      else if (exteriorDoorGrade === "Platinum"){
        exteriorDoorGradeFactor=1.55;
      }
      else {
        console.log("Invalid Selection")
      } 
      
      // ***** Note: this option should be excluded from rooms located on basement level *****
      if (floorLevelName !== "basement level"){
        newDoorOpeningTrue = window.prompt("Will any of these new ${roomTypeName} exterior doors require either enlargement of existing door openings, or creation of entirely new door openings? (options: yes, no)", ""); 
        if (newDoorOpeningTrue === "yes"){
          newDoorOpeningCount = parseInt(window.prompt("How many new exterior doors will require this? (options: select a number less than or equal to exteriorDoorCount)", "--please select--")); // user should be given option to choose a number from 1 up to a maximum of value of exteriorDoorCount
          newDoorOpeningCost = newDoorOpeningCount * newDoorOpeningPrice * ((yearBuiltFactor+1)/2);
        } 
      }

    exteriorDoorFinalCost= (exteriorDoorCount * exteriorDoorPrice * exteriorDoorGradeFactor * ((yearBuiltFactor+1)/2)) + newDoorOpeningCost;  // calculates cost of exterior door replacements, if applicable 
   }


// ********************************************************************
// ***** QUESTION # 13 to user - INTERIOR DOORS *****
// ********************************************************************

const interiorDoorPrice= 315.00; // base cost for replacement of 1 average interior door unit, (lockset not included). Price should not include painting of door unit (calculated later in painting).
const interiorLocksetPrice= 45.00; // price to supply & install 1 average grade interior lockset

let replaceInteriorDoorsTrue="";
let interiorDoorGrade="";
let replaceInteriorLocksetsTrue=""; // only asked to user if replaceInteriorDoorsTrue === "no", as locksets are automatically included as part of new door installations
let interiorLocksetGrade="";

let interiorDoorCount=""; // total definite number of interior door units to be replaced, as entered by user first as a string to capture "not sure". Set to indefinite approximate door count if user is "not sure"
let approxInteriorDoorCount= roomSizeSF/100; // assumes approx 1 interior door unit per 144 sf of floor area for living rooms, used if user not sure, or if ONLY lock-sets are being replaced without new doors
  if (approxInteriorDoorCount > 8){
  approxInteriorDoorCount= 8; // assign max value of 8 approximate interior doors for living rooms
  }
  else if (approxInteriorDoorCount < 1){
    approxInteriorDoorCount= 1; // assign min value of 1 approximate interior door
  } 

let interiorDoorGradeFactor=1.00; // grade of interior door to be mulitplied by count of door units
let interiorLocksetGradeFactor=1.00; // grade of interior door locksets to be multiplied by count of door locksets

let interiorLocksetCost=0; // total cost for supply & installation of new lock-sets depending on count, grade, and constant price

replaceInteriorDoorsTrue = window.prompt("Are you planning to replace any interior man door units in this ${roomTypeName}? (options: yes, no)", "");
  if (replaceInteriorDoorsTrue === "yes"){
      interiorDoorCount = window.prompt("How many interior door units will need to be replaced? *Please include interior door(s) for pantry if applicable (Options: 1 to 8 inclusive, 'not sure'):", "-- please select--")  
        if (interiorDoorCount === "not sure"){
          interiorDoorCount= approxInteriorDoorCount; // assign the approximated door count for living room if user is "not sure" about how many doors
        }
        else {
          interiorDoorCount= parseInt(interiorDoorCount); // should be a number from 1 to 8 inclusive
        }
      
      interiorDoorGrade = window.prompt("Please select grade of new interior man door units to be installed: (options: Bronze (economy); Silver (standard); Gold (upgraded); Platinum (high end)", "--please select--"); 
      if (interiorDoorGrade === "Bronze"){
        interiorDoorGradeFactor=0.85;
      }
      else if (interiorDoorGrade === "Silver"){
        interiorDoorGradeFactor=1.00; // neutral factor for average grade door units
      }
      else if (interiorDoorGrade === "Gold"){
        interiorDoorGradeFactor=1.40;
      }
      else if (interiorDoorGrade === "Platinum"){
        interiorDoorGradeFactor=1.85;
      }
      else {
        console.log("Invalid Selection")
      }
  interiorLocksetCost= interiorDoorCount * interiorLocksetPrice * interiorDoorGradeFactor;      
  interiorDoorFinalCost= (interiorDoorCount * interiorDoorPrice * interiorDoorGradeFactor * yearBuiltFactor) + interiorLocksetCost; // calculates cost of interior door replacements, if applicable 
  if (interiorDoorCount>3){
    interiorDoorFinalCost= interiorDoorFinalCost * 0.9; // 10% discount if 4 or more doors to install
  }
}

else if (replaceInteriorDoorsTrue === "no"){
  replaceInteriorLocksetsTrue = window.prompt("Are you planning to replace the door hardware (i.e. handle & hinges) in this ${roomTypeName}? (options: yes, no)", "");
    if (replaceInteriorLocksetsTrue === "yes"){
      
      interiorLocksetGrade = window.prompt("Please select grade of new door hardware to be installed: (options: Bronze (economy); Silver (standard); Gold (upgraded); Platinum (high end)", "--please select--"); 
      if (interiorLocksetGrade === "Bronze"){
        interiorLocksetGradeFactor=0.80;
      }
      else if (interiorLocksetGrade === "Silver"){
        interiorLocksetGradeFactor=1.00; // neutral factor for average grade door hardware
      }
      else if (interiorLocksetGrade === "Gold"){
        interiorLocksetGradeFactor=1.30;
      }
      else if (interiorLocksetGrade === "Platinum"){
        interiorLocksetGradeFactor=1.60;
      }
      else {
        console.log("Invalid Selection")
      }
    interiorLocksetCost= approxInteriorDoorCount * interiorLocksetPrice * interiorLocksetGradeFactor; 
    interiorDoorFinalCost= interiorLocksetCost; // Assign interiorLocksetCost to interiorDoorFinalCost as is the only cost associated with interior doors, since "no" new interior doors to be installed as specified by user
    }
}
else {
  console.log("Invalid Selection");
}


// ********************************************************************
// ***** QUESTION # 14 to user - CABINETS *****
// ********************************************************************

const kitchenCabinetRemovePrice= 999.99; // Price to remove kitchen cabinets for average sized kitchen (disposal not included in price in case customer wants to re-sell them)
const kitchenCabinetDisposePrice= 999.99; // Price to dispose of kitchen cabinets for average sized kitchen

const kitchenCabinetInstallNewPrice= 999.99; // Price per Linear foot to supply & install new average grade kitchen cabinets. 8' ceilings: *Note 1 LF = uppers & base. 0.5 LF = only upper OR base for that 1 foot section
const kitchenCabinetRefacePrice= 999.99; // Price per Linear foot to to REFACE kitchen cabinet doors, change hardware. 8' ceilings: *Note 1 LF = uppers & base. 0.5 LF = only upper OR base for that 1 foot section   
const kitchenCabinetPaintPrice= 999.99;  // Price per Linear foot to to PAINT kitchen cabinet doors, change hardware. 8' ceilings: *Note 1 LF = uppers & base. 0.5 LF = only upper OR base for that 1 foot section
const kitchenCabinetRefinishPrice= 999.99;  // Price per Linear foot to to RE-STAIN wood kitchen cabinet doors, change hardware. 8' ceilings: *Note 1 LF = uppers & base. 0.5 LF = only upper OR base for that 1 foot section

let kitchenCabinetsIncludedTrue="";

let kitchenCabinetInstallNewTrue="";
let kitchenCabinetRefaceTrue=""; 
let kitchenCabinetPaintTrue="";
let kitchenCabinetRefinishTrue="";

let kitchenContainsIslandTrue="";

let kitchenIslandPeninsulaLF=0;

let kitchenCabinetLF= (Math.sqrt(kitchenSizeSF) * 2) - pantryFootprint;
  if (kitchenCabinetLF > 40){
    kitchenCabinetLF= 40; // assign max initial value of 40, can still be increased by island/peninsula LF
  }

let kitchenCabinetCeilingFactor= ((ceilingFactor+1)/2);
  if (kitchenCabinetCeilingFactor > 1.08){
    kitchenCabinetCeilingFactor= 1.08; // assign max value of 1.08
  }

let kitchenCabinetGrade="";
let kitchenCabinetGradeFactor= 1.00; // Initialized to neutral


kitchenCabinetsIncludedTrue= window.prompt("Are you planning to either replace, reface, or refinish the {roomTypeName} cabinets? (options: Yes, No)", ""); 
  if (kitchenCabinetsIncludedTrue === "Yes"){
    
    // The following options should be given as a radio button selections. 1 item must be selected while kitchenCabinetsIncludedTrue === "Yes". ONLY 1 item can be selected (i.e. no multiple selections allowed):
    // User should be asked: "Please select what is required:"
    
    kitchenCabinetInstallNewTrue= window.prompt("Install new {roomTypeName} cabinets? (options: Yes, No)", ""); 
    kitchenCabinetRefaceTrue= window.prompt("Reface the {roomTypeName} cabinets? (options: Yes, No)", "");
    kitchenCabinetPaintTrue= window.prompt("Paint the {roomTypeName} cabinets? (options: Yes, No)", "");
    kitchenCabinetRefinishTrue= window.prompt("Refinish the {roomTypeName} cabinets? (options: Yes, No)", "");

    kitchenContainsIslandTrue= window.prompt("Will this {roomTypeName} contain an Island and/or Peninsula? (options: Yes, No)", ""); 
      if (kitchenContainsIslandTrue === "Yes"){
        kitchenIslandPeninsulaLF= kitchenSizeSF *0.032;
        if (kitchenIslandPeninsulaLF > 14){
            kitchenIslandPeninsulaLF= 14; // max value of 14 Linear Feet
        }  
        kitchenCabinetLF= kitchenCabinetLF + kitchenIslandPeninsulaLF;
      }
      
      if (kitchenCabinetInstallNewTrue === "Yes"){
        
        kitchenCabinetGrade = window.prompt("Please select grade of new cabinets: (options: Bronze (economy); Silver (standard); Gold (upgraded); Platinum (high end)", "");  
          if(kitchenCabinetGrade === "Bronze"){
            kitchenCabinetGradeFactor= 0.85;   
          }
          else if(kitchenCabinetGrade === "Silver"){
            kitchenCabinetGradeFactor= 1.00; 
          }
          else if(kitchenCabinetGrade === "Gold"){
            kitchenCabinetGradeFactor= 1.15;  
          }
          else if(kitchenCabinetGrade === "Platinum"){
            kitchenCabinetGradeFactor= 1.30;   
          }
          else {console.log("Invalid Selection")
          } 
    
        cabinetsFinalCost= kitchenCabinetInstallNewPrice * kitchenCabinetLF * kitchenCabinetCeilingFactor * kitchenCabinetGradeFactor;    
          
        } // End of kitchenCabinetInstallNewTrue === "Yes" section
    
    
    else if (kitchenCabinetRefaceTrue === "Yes"){
        cabinetsFinalCost= kitchenCabinetRefacePrice * kitchenCabinetLF * kitchenCabinetCeilingFactor * ((yearBuiltFactor+1)/2);
    }     
    
    else if (kitchenCabinetPaintTrue === "Yes"){
        cabinetsFinalCost= kitchenCabinetPaintPrice * kitchenCabinetLF * kitchenCabinetCeilingFactor * ((yearBuiltFactor+1)/2);
    } 
    
    else if (kitchenCabinetRefinishTrue === "Yes"){
        cabinetsFinalCost= kitchenCabinetRefinishPrice * kitchenCabinetLF * kitchenCabinetCeilingFactor * ((yearBuiltFactor+1)/2);
    } 
    
    else {
        console.log("Invalid Selection");
    }

} // End of kitchenCabinetsIncludedTrue === "Yes" section 


// ********************************************************************
// ***** QUESTION # 15 to user - COUNTERTOPS *****
// ********************************************************************

// Price per SF to supply & install each counter type, for kitchens
const graniteKitchenCounterPrice= 105.00; 
const quartzKitchenCounterPrice= 96.00;
const laminateKitchenCounterPrice= 56.00;
const woodKitchenCounterPrice= 72.00;
const solidSurfaceKitchenCounterPrice= 74.00;
const tileKitchenCounterPrice= 60.00;
const concreteKitchenCounterPrice= 84.00;
const stainlessSteelKitchenCounterPrice= 134.00;
const otherKitchenCounterPrice= 78.00;

let kitchenCountertopRate=0; // Holds current price of countertop based on type selected by user

let installKitchenCountertopsTrue="";

let kitchenCountertopType="";

let kitchenCountertopLF= ((Math.sqrt(kitchenSizeSF) * 2) + (kitchenIslandPeninsulaLF * 2.80) - pantryFootprint - 5); // 5LF represents fridge and stove not requiring countertops
  if (kitchenCountertopLF< 8){
    kitchenCountertopLF= 8; // min length of 8'
  } 
  else if (kitchenCountertopLF> 70){
    kitchenCountertopLF= 70; // max length of 70'    
  }

let kitchenCountertopSF= kitchenCountertopLF * 2.13; // 2.13 represents 25.5" depth per LF - islands set at 2.80 to double LF for being all base cabinets, + .80 for extra depth    

installKitchenCountertopsTrue= window.prompt("Are you planning to install new {roomTypeName} countertops? (options: Yes, No)", "");
  if (installKitchenCountertopsTrue === "Yes"){

    kitchenCountertopType = window.prompt("Please select type of new countertops to be installed: (options: Granite, Quartz, Laminate, Wood, Solid Surface, Tile, Concrete, Stainless Steel, Other)", "");
       if (kitchenCountertopType === "Granite") {
        kitchenCountertopRate= graniteKitchenCounterPrice;
       } 
       else if (kitchenCountertopType === "Quartz") {
        kitchenCountertopRate= quartzKitchenCounterPrice;
       } 
       else if (kitchenCountertopType === "Laminate") {
        kitchenCountertopRate= laminateKitchenCounterPrice;
       } 
       else if (kitchenCountertopType === "Wood") {
        kitchenCountertopRate= woodKitchenCounterPrice;
       } 
       else if (kitchenCountertopType === "Solid Surface") {
        kitchenCountertopRate= solidSurfaceKitchenCounterPrice;
       }
       else if (kitchenCountertopType === "Tile") {
        kitchenCountertopRate= tileKitchenCounterPrice;
       } 
       else if (kitchenCountertopType === "Concrete") {
        kitchenCountertopRate= concreteKitchenCounterPrice;
       } 
       else if (kitchenCountertopType === "Stainless Steel") {
        kitchenCountertopRate= stainlessSteelKitchenCounterPrice;
       } 
       else if (kitchenCountertopType === "Other") {
        kitchenCountertopRate= otherKitchenCounterPrice;
       }
       else {
        console.log("Invalid Selection");
       } 

    countertopFinalCost= kitchenCountertopRate * kitchenCountertopSF;

} // End of installKitchenCountertopsTrue === "Yes" section 


// ********************************************************************
// ***** QUESTION # 16 to user - BACKSPLASH *****
// ********************************************************************

const tileKitchenSplashPrice= 30.00; // Price per square foot to supply & install standard grade tile

let tileKitchenSplashSF= kitchenSizeSF * 0.325; // includes 8% waste factor
  if (tileKitchenSplashSF > 80){
    tileKitchenSplashSF= 80; // max value of 80 square feet
  }
  else if (tileKitchenSplashSF < 22){
    tileKitchenSplashSF= 22; // min value of 22 square feet
  }

let tileKitchenSplashTrue="";
let tileToCeilingTrue="";

let tileKitchenSplashGrade="";
let tileKitchenSplashGradeFactor=1.00;

tileKitchenSplashTrue= window.prompt("Are you planning to install tiled countertop backsplashes? (options: Yes, No)", "");
  if (tileKitchenSplashTrue === "Yes"){
    tileToCeilingTrue= window.prompt("Will tile be required up to ceiling height where available? (options: Yes; No, only to bottom of upper cabinets)", "");  
      if (tileToCeilingTrue === "Yes"){
        tileKitchenSplashSF= tileKitchenSplashSF * 1.27 * kitchenCabinetCeilingFactor;    
      }
      
    tileKitchenSplashGrade= window.prompt("Please select grade of new tiled backsplash to be installed: (options: Bronze (economy); Silver (standard); Gold (upgraded); Platinum (high end)", "");  
      
      if(tileKitchenSplashGrade === "Bronze"){
        tileKitchenSplashGradeFactor= 0.85;   
      }
      else if(tileKitchenSplashGrade === "Silver"){
        tileKitchenSplashGradeFactor= 1.00; 
      }
      else if(tileKitchenSplashGrade === "Gold"){
        tileKitchenSplashGradeFactor= 1.30;  
      }
      else if(tileKitchenSplashGrade === "Platinum"){
        tileKitchenSplashGradeFactor= 1.60;   
      }
      else {console.log("Invalid Selection")
      }   
     
backsplashFinalCost= tileKitchenSplashPrice * tileKitchenSplashGradeFactor * tileKitchenSplashSF; 
  
} // End of tileKitchenSplashTrue === "Yes" section


// ********************************************************************
// ***** QUESTION # 17 to user - SINK *****
// ********************************************************************

const installKitchenSinkPrice= 875.00; // Price to supply and install 1 average grade double bowl sink, including plumbing connections/labour & plumbing parts

let installKitchenSinkTrue="";

let installKitchenSinkQty=0;

let kitchenSinkGrade="";
let kitchenSinkGradeFactor=1.00;

installKitchenSinkTrue= window.prompt("Will any new kitchen sink(s) need to be installed? (options: Yes, No)", "")
  if (installKitchenSinkTrue === "Yes"){
    installKitchenSinkQty= parseInt(window.prompt("How many sinks? *Note: A double bowl sink counts as only 1 sink (Options: 1 to 3 inclusive", "--please select--"))
    
    kitchenSinkGrade= window.prompt("Please select grade of new kitchen sink(s): (options: Bronze (economy); Silver (standard); Gold (upgraded); Platinum (high end)", ""); 
    
      if(kitchenSinkGrade === "Bronze"){
        kitchenSinkGradeFactor= 0.80;   
      }
      else if(kitchenSinkGrade === "Silver"){
        kitchenSinkGradeFactor= 1.00; 
      }
      else if(kitchenSinkGrade === "Gold"){
        kitchenSinkGradeFactor= 1.55;  
      }
      else if(kitchenSinkGrade === "Platinum"){
        kitchenSinkGradeFactor= 2.10;   
      }
      else {console.log("Invalid Selection")
      }  

 sinkFinalCost= installKitchenSinkPrice * kitchenSinkGradeFactor * installKitchenSinkQty * ((yearBuiltFactor+1)/2);
} 


// ********************************************************************
// ***** QUESTION # 18 to user - FAUCET *****
// ********************************************************************

const installKitchenFaucetPrice= 540.00; // Price to supply and install 1 average grade kitchen faucet, including plumbing connections/labour & plumbing parts

let installKitchenFaucetTrue="";

let installKitchenFaucetQty=0;

let kitchenFaucetGrade="";
let kitchenFaucetGradeFactor=1.00;

installKitchenFaucetTrue= window.prompt("Will any new kitchen faucet(s) need to be installed? (options: Yes, No)", "")
  if (installKitchenFaucetTrue === "Yes"){
    installKitchenFaucetQty= parseInt(window.prompt("How many faucets? (Options: 1 to 4 inclusive", "--please select--"))
    
    kitchenFaucetGrade= window.prompt("Please select grade of new kitchen faucet(s): (options: Bronze (economy); Silver (standard); Gold (upgraded); Platinum (high end)", ""); 
    
      if(kitchenFaucetGrade === "Bronze"){
        kitchenFaucetGradeFactor= 0.65;   
      }
      else if(kitchenFaucetGrade === "Silver"){
        kitchenFaucetGradeFactor= 1.00; 
      }
      else if(kitchenFaucetGrade === "Gold"){
        kitchenFaucetGradeFactor= 1.50;  
      }
      else if(kitchenFaucetGrade === "Platinum"){
        kitchenFaucetGradeFactor= 2.15;   
      }
      else {console.log("Invalid Selection")
      }  

faucetFinalCost= installKitchenFaucetPrice * kitchenFaucetGradeFactor * installKitchenFaucetQty * ((yearBuiltFactor+1)/2);
} 


// ********************************************************************
// ***** QUESTION # 19 to user - DISHWASHER *****
// ********************************************************************

const installDishwasherPrice= 275.00; // Price to install 1 dishwasher in average/neutral conditions inlcuding supply of new shut-off & braided supply line/elbow

let installDishwasherTrue="";
let installDishwasherQty=0;

installDishwasherTrue= window.prompt("Will a dishwasher need to be installed? (options: Yes, No)", "")
  if (installDishwasherTrue === "Yes"){
    if (installKitchenSinkQty > 1 || installKitchenFaucetQty > 1){
        installDishwasherQty= parseInt(window.prompt("How many dishwashers? (Options: 1 to 2 inclusive", "--please select--"))    
    } 
    else {
        installDishwasherQty= 1; // assume 1 dishwasher if only 1 sink and 1 faucet or less 
    }     
  dishwasherFinalCost= installDishwasherPrice * installDishwasherQty * ((yearBuiltFactor+1)/2);  
}


// ********************************************************************
// ***** QUESTION # 20 to user - GARBURATOR *****
// ********************************************************************

const installGarburatorPrice= 195.00; // Price to install 1 garburator

let installGarburatorTrue="";
let installGarburatorQty=0;

installGarburatorTrue= window.prompt("Will a garburator need to be installed? (options: Yes, No)", "")
  if (installGarburatorTrue === "Yes"){
      if (installKitchenSinkQty > 1){
        installGarburatorQty= parseInt(window.prompt("How many garburators? (Options: 1 to 2 inclusive", "--please select--"))         
      } 
      else {
        installGarburatorQty= 1;    
      }
garburatorFinalCost= installGarburatorPrice * installGarburatorQty * ((yearBuiltFactor+1)/2);         
}


// ********************************************************************
// ***** QUESTION # 21 to user - FRIDGE WATER LINE *****
// ********************************************************************

const installFridgeWaterLinePrice= 160.00; // Price to rough-in and connect a fridge to a water source

let installFridgeLineTrue="";

installFridgeLineTrue= window.prompt("Will a water line connection be required for the refrigerator/ice maker? (options: Yes, No)", "") 
  if(installFridgeLineTrue === "Yes"){
    fridgeLineFinalCost= installFridgeWaterLinePrice * plumbingLevelFactor * ((yearBuiltFactor+1)/2);
  }


// ********************************************************************
// ***** QUESTION # 22 to user - RANGE HOOD *****
// ********************************************************************

const installUnderCabinetHoodPrice= 999.99;
const installUnderCabinetOtrMicrowavePrice= 999.99;
const installWallChimneyHoodPrice= 999.99;
const installFloatingIslandHoodPrice= 999.99;
const installDownDraftHoodPrice= 999.99;
const installOtherHoodPrice= 999.99; // Generic average price to install "Other" range hood selected by user

const roughInExteriorHoodVentPrice= 999.99; // Price to rough-in new venting for range hood in neutral conditions
const connectExteriorHoodVentPrice= 999.99; // Price to connect an average range hood appliance to an existing exterior vent

let installRangeHoodRate=0;

let installRangeHoodTrue="";
let rangeHoodType=""
let rangeHoodVentedTrue="";
let exteriorVentPreExistingTrue=""; // yes, no, not sure

let rangeHoodCeilingFactor= ((ceilingFactor+1)/2);
  if (rangeHoodCeilingFactor > 1.25){
    rangeHoodCeilingFactor= 1.25; // max value of 1.25
  }


installRangeHoodTrue= window.prompt("Will installation of a range hood or over the range (OTR) Microwave be required? (options: Yes, No)", "") 
  if (installRangeHoodTrue === "Yes"){

// Assign Range Hood Type:    
    rangeHoodType= window.prompt("Please select type of range rood: (options: Under cabinet hood; Under Cabinet OTR Microwave; Wall chimney hood; Floating island hood; Down draft hood; Other)", "") 
      if (rangeHoodType === "Under cabinet hood"){
        installRangeHoodRate= installUnderCabinetHoodPrice;
      }
      else if (rangeHoodType === "Under Cabinet OTR Microwave"){
        installRangeHoodRate= installUnderCabinetOtrMicrowavePrice;
      }
      else if (rangeHoodType === "Wall chimney hood"){
        installRangeHoodRate= installWallChimneyHoodPrice;
      }
      else if (rangeHoodType === "Floating island hood"){
        installRangeHoodRate= installFloatingIslandHoodPrice;
      }
      else if (rangeHoodType === "Down draft hood"){
        installRangeHoodRate= installDownDraftHoodPrice;
      }
      else if (rangeHoodType === "Other"){
        installRangeHoodRate= installOtherHoodPrice;
      }
      else {
          console.log("Invalid Selection");
      }

    rangeHoodVentedTrue= window.prompt("Will this range hood be exhausted to exterior? (options: Yes, exhausted to exterior; No, exhausted to interior using filter is fine)", "")
      if (rangeHoodVentedTrue === "Yes, exhausted to exterior"){
        exteriorVentPreExistingTrue= window.prompt("Is the required exterior vent already roughed in? (options: Yes; No; Not sure)", "") 
        if (exteriorVentPreExistingTrue === "Yes"){
            rangeHoodFinalCost= installRangeHoodRate + (connectExteriorHoodVentPrice * ((yearBuiltFactor+1)/2));
        }
          
        else if (exteriorVentPreExistingTrue === "No"){
            if (rangeHoodType === "Floating island hood" || rangeHoodType === "Down draft hood"){
                rangeHoodFinalCost= installRangeHoodRate + (roughInExteriorHoodVentPrice * yearBuiltFactor * 1.75) + (connectExteriorHoodVentPrice * ((yearBuiltFactor+1)/2)); // Add 75% to cost of exhaust rough-in for those 2 types of hoods 
            }
            else {
                rangeHoodFinalCost= installRangeHoodRate + (roughInExteriorHoodVentPrice * yearBuiltFactor) + (connectExteriorHoodVentPrice * ((yearBuiltFactor+1)/2));
            }
        }
            
        else if (exteriorVentPreExistingTrue === "Not sure"){
            if (rangeHoodType === "Floating island hood" || rangeHoodType === "Down draft hood"){
                rangeHoodFinalCost= installRangeHoodRate + (roughInExteriorHoodVentPrice * yearBuiltFactor) + (connectExteriorHoodVentPrice * ((yearBuiltFactor+1)/2)); // Do not Add 75% to cost of exhaust rough-in for those 2 types of hoods if "Not Sure" 
            }
            else {
                rangeHoodFinalCost= installRangeHoodRate + (roughInExteriorHoodVentPrice * 0.4 * yearBuiltFactor) + (connectExteriorHoodVentPrice * ((yearBuiltFactor+1)/2)); // Charge 40% of rough-in price if "Not sure"
            }
        }    
    } 

      else if (rangeHoodVentedTrue === "No, exhausted to interior using filter is fine"){
        rangeHoodFinalCost= installRangeHoodRate;
      } 

// Apply final ceiling factor for these 2 types of hoods:      
if (rangeHoodType === "Wall chimney hood" || rangeHoodType === "Floating island hood"){
    rangeHoodFinalCost= rangeHoodFinalCost * rangeHoodCeilingFactor;
}

} // End of installRangeHoodTrue === "Yes" section  


// ********************************************************************
// ***** QUESTION # 23 to user - COOKTOP *****
// ********************************************************************

const installCookTopPrice= 999.99; // Price to cut, mount, connect & install an average cooktop

let installCookTopTrue="";

installCookTopTrue= window.prompt("Will installation of a drop-in cooktop be required? (options: Yes, No)", "");
  if (installCookTopTrue === "Yes"){
    cookTopFinalCost= installCookTopPrice;
  }  


// ********************************************************************
// ***** QUESTION # 24 to user - WALL OVEN *****
// ********************************************************************  

const installWallOvenPrice= 999.99; // Price to mount, connect, and install an average wall oven

let installWallOvenTrue="";

installWallOvenTrue= window.prompt("Will installation of a wall oven be required? (options: Yes, No)", "");
  if (installWallOvenTrue === "Yes"){
    wallOvenFinalCost= installWallOvenPrice;
  }
  
  
// ********************************************************************
// ***** QUESTION # 25 to user - GAS LINE(S) *****
// ********************************************************************   

const kitchenGasPermitPrice= 999.99; // Price for gas permit & inspection. Only 1 required no matter number of appliances
const kitchenGasLineRoughInPrice= 999.99; // Price to rough-in a new gas line in neutral/average conditions
const kitchenConnectGasAppliancePrice= 999.99; // Price to connect 1 kitchen appliance to an existing gas line

// Add half of connection price for each following appliance being true. Assumes there will be an initial range to connect, plus the following items:
if (installCookTopTrue === "Yes"){
    kitchenConnectGasAppliancePrice= kitchenConnectGasAppliancePrice + (kitchenConnectGasAppliancePrice * 0.5)      
}
if (installWallOvenTrue === "Yes"){
    kitchenConnectGasAppliancePrice= kitchenConnectGasAppliancePrice + (kitchenConnectGasAppliancePrice * 0.5)      
}

let anyKitchenApplianceGasTrue="";
let anyGasLineRoughInRequiredTrue="";

anyKitchenApplianceGasTrue= window.prompt("Will any kitchen appliances be gas? (options: Yes; No, electric only)", "");
  if (anyKitchenApplianceGasTrue === "Yes"){
    anyGasLineRoughInRequiredTrue= window.prompt("Will any new gas service lines need to be roughed in or relocated? (options: Yes; No, all required gas lines are in place)", ""); 
      if (anyGasLineRoughInRequiredTrue === "Yes"){
        gasLineConnectionFinalCost= kitchenGasPermitPrice + (kitchenGasLineRoughInPrice * yearBuiltFactor) + kitchenConnectGasAppliancePrice; 
      }
      else if (anyGasLineRoughInRequiredTrue === "No, all required gas lines are in place"){
        gasLineConnectionFinalCost= kitchenGasPermitPrice + kitchenConnectGasAppliancePrice; 
      } 
}


// ********************************************************************
// ***** QUESTION # 26 to user - CEILING REFINISHING *****
// ********************************************************************

const ceilingDrywallTexturedPrice= 6.50; // Price per Square Foot to scrape, repair, paint, and install new span textured ceilings in average room conditions in average age home
const ceilingDrywallSmoothPrice= 7.25; // Price per Square Foot to scrape, repair, paint, and install new span textured ceilings in average room conditions in average age home
const ceilingSuspendedPrice= 7.00; // Price per square foot to install average grade 2x2 suspended ceiling
const ceilingCofferedPrice= 17.00; // Price per square foot to install average grade coffered / architectural ceilings in average room conditions in average age home & ceiling height
const ceilingOtherPrice= 8.00;

const newSkylightPrice= 2800.00; // Price to install 1 new skylight in average conditions
const replaceSkylightPrice = 1600.00; // Price to replace or repair 1 average skylight in average conditions

let ceilingRate=0; // Factor per Square foot to install selected ceiling type. Assigned price value of type selected
let skyRate=0; // Factor assigned by type of skylight installation chosen by user. Multiplied by skyCount to get skyCost;

let refinishCeilingTrue="";
let includeDiningCeilingTrue=""; // yes or no if dining room ceiling will be included as part of reno. Only asked if dining room is part of reno from earlier question

let ceilingType="";
let panelGrade="";
let cofferedGrade="";
let installSkyTrue="";
let skyType="";

let skyCount=0;

let skyCost=0;

refinishCeilingTrue = window.prompt("Will the ceiling(s) most likely need to be refinished in this Kitchen? (options: yes, no)", "");
  if (refinishCeilingTrue === "yes"){

    // Ask if Dining ceiling will be included. Used in ceilingFinalCost calculation    
    if (includeDiningTrue === "yes"){
        includeDiningCeilingTrue= window.prompt("Will the dining room/area ceiling also need to be refinished? (options: yes, no)", "");       
    }  

      ceilingType= window.prompt("Please select type of new ceiling: (options: drywall textured, drywall smooth, suspended panels, coffered/architectural, other)", "--please select--");
      if (ceilingType === "drywall textured"){
          ceilingRate= ceilingDrywallTexturedPrice;
      }
      else if (ceilingType === "drywall smooth"){
        ceilingRate= ceilingDrywallSmoothPrice;
      }
      else if (ceilingType === "suspended panels"){
        panelGrade = window.prompt("Please select grade of new ceiling tiles: (options: Bronze (economy); Silver (standard); Gold (upgraded); Platinum (high end)", "--please select--"); 
          if (panelGrade === "Bronze"){
            ceilingRate= ceilingSuspendedPrice * 0.82;
          }
          else if (panelGrade === "Silver"){
            ceilingRate= ceilingSuspendedPrice; 
          } 
          else if (panelGrade === "Gold"){
            ceilingRate= ceilingSuspendedPrice * 1.25;
          }
          else if (panelGrade === "Platinum"){
            ceilingRate= ceilingSuspendedPrice * 1.55;
          }  
          else {
            console.log("Invalid Selection")
          } 
      }
      else if (ceilingType === "coffered/architectural"){
        cofferedGrade = window.prompt("Please select grade of new coffered/architectural ceiling: (options: Bronze (economy); Silver (standard); Gold (upgraded); Platinum (high end)", "--please select--"); 
          if (cofferedGrade === "Bronze"){
            ceilingRate= ceilingCofferedPrice * 0.85;
          }
          else if (cofferedGrade === "Silver"){
            ceilingRate= ceilingCofferedPrice;
          } 
          else if (cofferedGrade === "Gold"){
            ceilingRate= ceilingCofferedPrice * 1.30; 
          }
          else if (cofferedGrade === "Platinum"){
            ceilingRate= ceilingCofferedPrice * 1.60; 
          }  
          else {
            console.log("Invalid Selection")
          } 
      }
      else if (ceilingType === "other"){
        ceilingRate = ceilingOtherPrice;
      }
      else {
        console.log("Invalid Selection")
      } 
  
  if (floorLevelName === "upper level" || floorLevelName === "main level"){ // Only ask skylight question to user if floor level of this room is on main or upper level
  installSkyTrue = window.prompt("Will any skylight(s) be included as part of this ${roomTypeName} renovation? (options: yes, no)", "");
    if (installSkyTrue === "yes"){
        skyType = window.prompt("What type of skylight installation is required: (options: Install new skylight(s); Replace or Repair existing skylight(s)):", "--please select--");
          if (skyType === "Install new skylight(s)"){
            skyRate= newSkylightPrice;
          }
          else if (skyType === "Replace or Repair existing skylight(s)"){
            skyRate= replaceSkylightPrice;
          }
          else {
            console.log("Invalid Selection")
          } 
        skyCount= parseInt(window.prompt("Please select total # of skylights: (Options: 1 to 8 inclusive):", "-- please select--"))
        skyCost= skyRate * skyCount;
    }
  }
  
  if (includeDiningCeilingTrue === "yes"){
    ceilingFinalCost= ((ceilingRate * roomSizeSF * 1.07) + skyCost) * ceilingFactor * ((yearBuiltFactor+1)/2); // Includes 1.07% waste factor on new ceiling. Uses roomSizeSF becasue dining ceiling included 
  }
  else if (includeDiningCeilingTrue === "no"){
    ceilingFinalCost= ((ceilingRate * kitchenSizeSF * 1.07) + skyCost) * ceilingFactor * ((yearBuiltFactor+1)/2); // Includes 1.07% waste factor on new ceiling. Uses kitchenSizeSF because dining ceiling NOT included     
  } 
 }


// ********************************************************************
// ***** QUESTION # 27 to user - FLOORING *****
// ********************************************************************

// Price PER SQUARE FOOT to supply & install, including required substrates and underlay/under-pad - average grade 
const newLinoFloorPrice= 4.50;  
const newHardwoodFloorPrice= 12.50;  
const refinishHardwoodFloorPrice= 8.75; // Price per Square Foot to sand/strip existing hardwood floors and refinish them
const newLaminateFloorPrice= 8.00;  
const newLvpFloorPrice= 7.25;  
const newEngHwFloorPrice= 9.25;  
const newCorkFloorPrice= 8.00;  
const newCeramicTileFloorPrice= 15.50;  
const newLvtFloorPrice= 9.75;  
const newNaturalStoneFloorPrice= 19.25;  
const newOtherFloorPrice= 8.25;  // Used for "Other" & "Not Sure" selections by user, Price per Square Foot to supply & install, including required sub-strates and underlay/underpad - average grade

const newInsulatedSubPrice= 4.25; // Price per Square Foot to supply & install new dricore insulated sub-floor - average/good conditions

// Prices to remove specific type of existing flooring in average conditions, includes disposal to landfill. Includes pulling nails, staples, scraping glue, etc.:
const removeCarpetFloorPrice= 0.80; 
const removeLinoFloorPrice= 0.50;  
const removeHardwoodFloorPrice= 1.50;  
const removeLaminateFloorPrice= 0.65;  
const removeLvpFloorPrice= 0.65;  
const removeEngHwFloorPrice= 0.65;  
const removeCorkFloorPrice= 0.65;  
const removeCeramicTileFloorPrice= 1.75;  
const removeLvtFloorPrice= 0.85;  
const removeNaturalStoneFloorPrice= 1.75;  
const removeOtherFloorPrice= 0.75; // Price used for selections of "Other" & "Not Sure" by user

let replaceFlooringTrue="";
let newFloorType=""; // stores type of new flooring to be installed, selected by user
let newFloorGrade=""; // stores grade of new flooring to be installed, selected by user
let installSubfloorTrue=""; // stores yes or no, will installation of new dri-core insulated sub-floor be required?
let existingFloorType=""; // stores type of existing flooring to be removed

let newFloorRate=0; // Price to install new flooring, per square foot, based on type selected by user
let removeFloorRate=0; // Current Price to remove existing floor coverings (if required) including disposal & prep existing substrates, per square foot, if any
let insulatedSubfloorRate=0; // Current Price to install wood insulated subfloor (i.e. dri-core) per square foot, if "yes" selected by user, if any

let newFloorGradeFactor=1.00; // multiplying factor for new floor rate based on GRADE of new flooring to be installed, chosen by user. Must be set to neutral 1.00 until changed by user

let newFlooringQuantitySF= (kitchenSizeSF * 0.95) + (diningSizeSF * 1.07) + (additionalWalkInPantrySpaceSF * 1.07); // 7% waste factor not added to kitchen to compensate for cabinet footprint. 0.95 represents taking additional 5% off for cabinets 

replaceFlooringTrue= window.prompt("Are you planning to replace or refinish the flooring in this ${roomTypeName}? (options: yes, no)", "");
      if (replaceFlooringTrue === "yes"){
        
        // Assign value of newFloorRate: 
        newFloorType = window.prompt("Please select primary type of new flooring to be installed: (options: Linoleum; Hardwood - Install New; Hardwood - Refinish Existing; Laminate; Luxury Vinyl Plank; Engineered Hardwood; Cork; Ceramic Tile; Luxury Vinyl Tile; Natural Stone; Other; Not Sure)", "--please select--");
       
        // *** Note: carpet removed from choices here
        if (newFloorType === "Linoleum"){
          newFloorRate= newLinoFloorPrice;
        }
        else if (newFloorType === "Hardwood - Install New"){
          newFloorRate= newHardwoodFloorPrice;
        }
        else if (newFloorType === "Hardwood - Refinish Existing"){
          newFloorRate= refinishHardwoodFloorPrice;
        } 
        else if (newFloorType === "Laminate"){
          newFloorRate= newLaminateFloorPrice;
        } 
        else if (newFloorType === "Luxury Vinyl Plank"){
          newFloorRate= newLvpFloorPrice;
        }
        else if (newFloorType === "Engineered Hardwood"){
          newFloorRate= newEngHwFloorPrice;
        }
        else if (newFloorType === "Cork"){
          newFloorRate= newCorkFloorPrice;
        }
        else if (newFloorType === "Ceramic Tile"){
          newFloorRate= newCeramicTileFloorPrice;
        }
        else if (newFloorType === "Luxury Vinyl Tile"){
          newFloorRate= newLvtFloorPrice;
        }
        else if (newFloorType === "Natural Stone"){
          newFloorRate= newNaturalStoneFloorPrice;
        }
        else if (newFloorType === "Other"){
          newFloorRate= newOtherFloorPrice;
        }
        else if (newFloorType === "Not Sure"){
          newFloorRate= newOtherFloorPrice;
        }
        else {
          console.log("Invalid Input")
        }
        
        // Ask next questions regarding floor type to remove, grade, and insulated floor as long as newFloorType is NOT "Hardwood - Refinish Existing", as refinishing hardwood does not require removal, grade, or an insulated sub-floor
       if (newFloorType !== "Hardwood - Refinish Existing"){

        // Assign value of new floor Grade:
        newFloorGrade = window.prompt("Please select grade of new flooring to be installed:? (options: Bronze (economy); Silver (standard); Gold (upgraded); Platinum (high end)", "--please select--");   
          if (newFloorGrade === "Bronze"){
            newFloorGradeFactor = 0.78; // 22% Less for economy than average flooring cost
          }
          else if (newFloorGrade === "Silver"){
            newFloorGradeFactor = 1.00; // Neutral factor for average grade flooring
          }
          else if (newFloorGrade === "Gold"){
            newFloorGradeFactor = 1.16; // 16% Increase for upgraded flooring from average
          }
          else if (newFloorGrade === "Platinum"){
            newFloorGradeFactor = 1.32; // 32% Increase for high end flooring from average
          }
          else {
            console.log("Invalid Input");
          }

        // Assign value of existingFloorRate:
        existingFloorType = window.prompt("Please select existing flooring type to be removed: (options: N/A - there is no existing flooring to remove; Carpet; Linoleum; Hardwood; Laminate; Luxury Vinyl Plank; Engineered Hardwood; Cork; Ceramic Tile; Luxury Vinyl Tile; Natural Stone; Other; Not Sure)", "--please select--");
        
        if (existingFloorType === "N/A - there is no existing flooring to remove"){
          removeFloorRate= 0.00;
        }
        else if (existingFloorType === "Carpet"){
          removeFloorRate= removeCarpetFloorPrice;
        } 
        else if (existingFloorType === "Linoleum"){
          removeFloorRate= removeLinoFloorPrice;
        }
        else if (existingFloorType === "Hardwood"){
          removeFloorRate= removeHardwoodFloorPrice;
        }
        else if (existingFloorType === "Laminate"){
          removeFloorRate= removeLaminateFloorPrice;
        }
        else if (existingFloorType === "Luxury Vinyl Plank"){
          removeFloorRate= removeLvpFloorPrice;
        }
        else if (existingFloorType=== "Engineered Hardwood"){
          removeFloorRate= removeEngHwFloorPrice;
        }
        else if (existingFloorType=== "Cork"){
          removeFloorRate= removeCorkFloorPrice;
        }
        else if (existingFloorType === "Ceramic Tile"){
          removeFloorRate= removeCeramicTileFloorPrice;
        }
        else if (existingFloorType === "Luxury Vinyl Tile"){
          removeFloorRate= removeLvtFloorPrice;
        }
        else if (existingFloorType === "Natural Stone"){
          removeFloorRate= removeNaturalStoneFloorPrice;
        }
        else if (existingFloorType === "Other"){
          removeFloorRate= removeOtherFloorPrice;
        }
        else {
          console.log("Invalid Input")
        }
        
        // Assign value to Insulated subfloor. Only asks user this question if floor level is in basement or lower level
        if (floorLevelName === "basement level" || floorLevelName === "lower level"){ 
          installSubfloorTrue = window.prompt("Are you planning to install an insulated subfloor system (i.e. Dricore or similar) in this ${roomTypeName}? (options: yes, no)", ""); // Question is only asked for basement & lower levels. No sub-floor is ever required on main & upper floor levels
            if (installSubfloorTrue === "yes") {
              insulatedSubfloorRate= newInsulatedSubPrice;
            }
        }
      }    
     flooringFinalCost= (newFloorRate * newFlooringQuantitySF * newFloorGradeFactor) + (removeFloorRate * newFlooringQuantitySF) + (insulatedSubfloorRate * newFlooringQuantitySF * yearBuiltFactor); // calculates cost of flooring, including insulated wood sub-flooring, if applicable  
}


// ********************************************************************
// ***** QUESTION # 28 to user - MOULDINGS & MILLWORK *****
// ********************************************************************

const baseboardPrice= 5.25; // price to supply & install average grade baseboards per linear foot, in average conditions, includes removal & disposal of existing
const windowCasingPrice= 4.75; // price to supply & install average grade window casings per linear foot, in average conditions, includes removal & disposal of existing
const doorCasingPrice= 4.50; // price to supply & install average grade door casings per linear foot, in average conditions, includes removal & disposal of existing
const wainscottingPrice= 55.00; // price to supply & install average grade wainscotting per linear foot, in average conditions
const crownPrice= 10.00; // price to supply & install average grade crown moulding per linear foot in average conditions

let installMouldingsTrue="";

let installBaseboardsTrue="";
let installWindowCasingsTrue="";
let installDoorCasingsTrue="";
let installWainscottingTrue="";
let installCrownTrue="";

let mouldingGrade="";

let baseboardLF= Math.sqrt(roomSizeSF + additionalWalkInPantrySpaceSF) * 1.50; // approximates linear footage of baseboards based off square footage of room
let windowCasingLF= roomSizeSF * 0.18; // approximates linear footage of window casings based off square footage of room
let doorCasingLF= ((roomSizeSF + additionalWalkInPantrySpaceSF) /120 ) * 36; // approximates linear footage of door casings based off square footage of room 
let wainscottingLF= Math.sqrt(roomSizeSF) * 1.10; // approximates linear footage of wainscotting based off square footage of room
  let crownLF= Math.sqrt(roomSizeSF) * 3 * 1.10; // approximates linear footage of crown moulding based off square footage of room + 10% waste factor

let mouldingGradeFactor= 1.00;

let baseboardCost=0;
let windowCasingCost=0;
let doorCasingCost=0;
let wainscottingCost=0;
let crownCost=0;

installMouldingsTrue = window.prompt("Will any new mouldings or millwork need to be installed in this ${roomTypeName}? (options: yes, no)", "");
  if(installMouldingsTrue === "yes"){
    // *** This should be re-coded to radio buttons, asking user to "Please select all that apply:" - should have error message that at least 1 selection is required as long as installMouldingsTrue === "yes"
    installBaseboardsTrue = window.prompt("Install new Baseboards? (options: yes, no)", "");
    installWindowCasingsTrue = window.prompt("Install new Window Casings? (options: yes, no)", "");
    installDoorCasingsTrue = window.prompt("Install new Door Casings? (options: yes, no)", "");
    installWainscottingTrue = window.prompt("Install new Wainscotting? (options: yes, no)", "");
    installCrownTrue = window.prompt("Install new Crown Mouldings? (options: yes, no)", "");

    mouldingGrade = window.prompt("Please select grade of new mouldings & millwork to be installed: (options: Bronze (economy); Silver (standard); Gold (upgraded); Platinum (high end)", "--please select--"); 
      if (mouldingGrade === "Bronze"){
        mouldingGradeFactor = 0.75
      }
      else if (mouldingGrade === "Silver"){
        mouldingGradeFactor = 1.00
      }
      else if (mouldingGrade === "Gold"){
        mouldingGradeFactor = 1.40
      }
      else if (mouldingGrade === "Platinum"){
        mouldingGradeFactor = 1.75
      }
      else {
        console.log("Invalid Input")
      }
      
    if (installBaseboardsTrue === "yes"){
      baseboardCost= baseboardPrice * baseboardLF * mouldingGradeFactor;
    }
    if (installWindowCasingsTrue === "yes"){
      windowCasingCost= windowCasingPrice * windowCasingLF * mouldingGradeFactor * ((ceilingFactor+1)/2);
    }   
    if (installDoorCasingsTrue === "yes"){
      doorCasingCost= doorCasingPrice * doorCasingLF * mouldingGradeFactor;
    }   
    if (installWainscottingTrue === "yes"){
      wainscottingCost= wainscottingPrice * wainscottingLF * mouldingGradeFactor;
    }   
    if (installCrownTrue === "yes"){
      crownCost= crownPrice * crownLF * mouldingGradeFactor * ceilingFactor;
    } 
  mouldingsFinalCost= baseboardCost + windowCasingCost + doorCasingCost + wainscottingCost + crownCost; // calculates cost of all mouldings & millwork, if applicable 
}


// ********************************************************************
// ***** QUESTION # 29 to user - RAILING SECTIONS *****
// ********************************************************************

const installKitchenRailingBronzePrice= 99.99; // Price per linear foot to remove existing, dispose, supply & install bronze grade guard railings
const installKitchenRailingSilverPrice= 99.99; // Price per linear foot to remove existing, dispose, supply & install silver grade guard railings
const installKitchenRailingGoldPrice= 99.99; // Price per linear foot to remove existing, dispose, supply & install gold grade guard railings
const installKitchenRailingPlatinumPrice= 99.99; // Price per linear foot to remove existing, dispose, supply & install platinum grade guard railings

const paintKitchenRailingPrice= 99.99; // Price per linear foot to paint railings
const refinishKitchenRailingPrice= 99.99; // Price per linear foot to sand & stain railings
const covertKitchenRailingToWallPrice= 99.99; // price per linear foot to remove a railing section, frame, board, tape, and cap with MDF 
const removeKitchenRailingPrice= 99.99; // Price per linear foot to remove a railing section, repair wall & floor as required. *For smaller step heights that do not require railings

let kitchenRailingRate=0; // Holds current price for railings based on type selected by user

let kitchenRailingTrue="";

let kitchenRailingType="";
let kitchenRailingGrade="";
let kitchenRailingRelativeQty="";
let kitchenRailingQtyFactor=0; // Holds LF of railing to be replaced

kitchenRailingTrue= window.prompt("Will any ${roomTypeName} specific guard railing section(s) need to be replaced, altered, or refinished? *Note: Do NOT include railings that are part of a staircase or stairwell. (options: Yes, No)", ""); 
  if (kitchenRailingTrue === "Yes"){
    kitchenRailingType= window.prompt("Please select: (options: Install new guard railing(s); Paint guard railings; Refinish guard railings; Convert guard railings to a solid wall; Permanently remove guard railings)", ""); 
    
    if (kitchenRailingType === "Install new guard railing(s)"){
      kitchenRailingGrade = window.prompt("Please select grade of new railing(s) to be installed: (options: Bronze (economy); Silver (standard); Gold (upgraded); Platinum (high end)", "--please select--"); 
      if (kitchenRailingGrade === "Bronze"){
        kitchenRailingRate= installKitchenRailingBronzePrice;
      }
      else if (kitchenRailingGrade === "Silver"){
        kitchenRailingRate= installKitchenRailingSilverPrice;
      }
      else if (kitchenRailingGrade === "Gold"){
        kitchenRailingRate= installKitchenRailingGoldPrice;
      }
      else if (kitchenRailingGrade === "Platinum"){
        kitchenRailingRate= installKitchenRailingPlatinumPrice;
      }
      else {
        console.log("Invalid Input")
      }
    }

  else if (kitchenRailingType === "Paint guard railings"){
    kitchenRailingRate= paintKitchenRailingPrice;
  }
  
  else if (kitchenRailingType === "Refinish guard railings"){
    kitchenRailingRate= refinishKitchenRailingPrice;
  }

  else if (kitchenRailingType === "Convert guard railings to a solid wall"){
    kitchenRailingRate= covertKitchenRailingToWallPrice;
  }

  else if (kitchenRailingType === "Permanently remove guard railings"){
    kitchenRailingRate= removeKitchenRailingPrice;
  }
  else {
    console.log("Invalid Selection");
  }

  kitchenRailingRelativeQty= window.prompt("Please select the relative quantity of new railings to be installed: (options: Minimal; Small; Average; Large; Extra Large)", "--please select--"); 
    
    if (kitchenRailingRelativeQty === "Minimal"){
      kitchenRailingQtyFactor= 4 * kitchenSizeFactor;
    }
    else if (kitchenRailingRelativeQty === "Small"){
      kitchenRailingQtyFactor= 5 * kitchenSizeFactor;
    }  
    else if (kitchenRailingRelativeQty === "Average"){
      kitchenRailingQtyFactor= 9 * kitchenSizeFactor;
    } 
    else if (kitchenRailingRelativeQty === "Large"){
      kitchenRailingQtyFactor= 13 * kitchenSizeFactor;
    } 
    else if (kitchenRailingRelativeQty === "Extra Large"){
      kitchenRailingQtyFactor= 18 * kitchenSizeFactor;
    } 
    else {
      console.log("Invalid Selection");
    }

    railingsFinalCost= kitchenRailingRate * kitchenRailingQtyFactor * ((yearBuiltFactor+1)/2);   

  } // End of kitchenRailingTrue === "Yes" section 


// ********************************************************************
// ***** QUESTION # 30 to user - LIGHTING *****
// ********************************************************************

const kitchenLightFixturePrice= 140.00;  // Price to supply & install 1 average grade standard light fixture in average/neutral conditions
const kitchenPotLightPrice= 840.00;  // Price to install 1 application (4 POTS) of kitchen pot lighting, with neutral conditions for average sized kitchen
const hangingPendantLightPrice= 260.00; // Price to supply & install 1 average grade hanging pendant light fixture
const diningChandelierPrice= 580; // Price to supply & install 1 average grade dining chadelier for average sized room
const ceilingFanPrice= 360.00;  // Price to supply & install an average ceiling fan with neutral conditions (i.e. 8' ceiling, non-vaulted, etc)
const underCabinetLightPrice= 1400.00; // Price to rough-in, supply & install average grade under-cabinet lighting for average sized kitchen
const newLightingPrice= 280.00;  // Price to rough-in average quantity of new light fixtures/circuits per average sized kitchen/dining

let updateLightingTrue="";

let kitchenLightFixtureTrue="";
let kitchenPotLightTrue="";
let hangingPendantLightTrue="";
let diningChandelierTrue="";
let ceilingFanTrue="";
let underCabinetLightTrue="";
let newLightingTrue="";

let lightingGrade="";

let approxUpdateLightsQty= roomSizeSF / 60; // approximates number of light fixtures required for living room if user "not sure" about quantity of new light fixtures required
  if (approxUpdateLightsQty > 6){
    approxUpdateLightsQty= 6; // max value of 6 for approxUpdateLightsQty
  }

let newLightingQty= roomSizeSF / 140;
  if (newLightingQty > 2){
    newLightingQty= 2; // max value of 2 
  }  

let lightingGradeFactor= 1.00;

let newLightingCost=0;
let kitchenLightFixtureCost=0;
let kitchenPotLightCost=0;
let hangingPendantLightCost=0;
let diningChandelierCost=0;
let ceilingFanCost=0;
let underCabinetLightCost=0;


updateLightingTrue = window.prompt("Will any new light fixture(s) need to be installed or updated in this ${roomTypeName}? (options: yes, no)", "");
  if(updateLightingTrue === "yes"){
    
// *** Should be coded as radio buttons. At least one selection is required. "Select all to be installed:"  
    kitchenLightFixtureTrue= window.prompt("Standard Light Fixture(s)? (options: yes, no)", "");
    kitchenPotLightTrue= window.prompt("Recessed Pot Lighting? (options: yes, no)", "");
    hangingPendantLightTrue= window.prompt("Hanging Pendant Light Fixtures? (options: yes, no)", "");
    diningChandelierTrue= window.prompt("Chandelier? (options: yes, no)", "");
    ceilingFanTrue= window.prompt("Ceiling Fan? (options: yes, no)", "");
    underCabinetLightTrue= window.prompt("Under cabinet Accent Lighting? (options: yes, no)", "");

// Assign lightingGradeFactor:
  lightingGrade = window.prompt("Please select grade of new {roomTypeName} lighting to be installed: (options: Bronze (economy); Silver (standard); Gold (upgraded); Platinum (high end)", "--please select--"); 
  if (lightingGrade === "Bronze"){
    lightingGradeFactor= 0.75 // 22% less than average grade lighting
  }
  else if (lightingGrade === "Silver"){
    lightingGradeFactor = 1.00 // neutral factor for average grade lighting
  }
  else if (lightingGrade === "Gold"){
    lightingGradeFactor = 1.50 // 50% increase for upgraded lighting
  }
  else if (lightingGrade === "Platinum"){
    lightingGradeFactor = 1.85 // 85% increase for high end lighting
  }
  else {
    console.log("Invalid Input")
  }

  newLightingTrue = window.prompt("Will addition or relocation of any lighting circuits be required in this {roomTypeName}? (options: Yes; No - Replacing light fixtures in their current location only", "");
  if (newLightingTrue === "Yes"){
    newLightingCost= newLightingQty * newLightingPrice * yearBuiltFactor * ceilingFactor; 
  }  

// Assign value of kitchenLightFixtureCost:  
  if (kitchenLightFixtureTrue === "yes"){
    if (kitchenPotLightTrue !== "yes"){
      kitchenLightFixtureCost= kitchenLightFixturePrice * lightingGradeFactor * approxUpdateLightsQty * ((ceilingFactor+1)/2);
    }
    else if (kitchenPotLightTrue === "yes"){
      kitchenLightFixtureCost= kitchenLightFixturePrice * lightingGradeFactor * (approxUpdateLightsQty * 0.6) * ((ceilingFactor+1)/2); // assume only 60% of lighting will be required with pot lights also being true
    }
  }

// Assign value of kitchenPotLightCost:
  if (kitchenPotLightTrue === "yes"){
    if (kitchenLightFixtureTrue !== "yes"){
      kitchenPotLightCost= kitchenPotLightPrice * ((((lightingGradeFactor+1)/2)+1)/2) * approxUpdateLightsQty * kitchenSizeFactor * ((ceilingFactor+1)/2);
    }
    else if (kitchenLightFixtureTrue === "yes"){
      kitchenPotLightCost= kitchenPotLightPrice * ((((lightingGradeFactor+1)/2)+1)/2) * (approxUpdateLightsQty * 0.70) * kitchenSizeFactor * ((ceilingFactor+1)/2); // assume only 70% of pot lighting will be required with light fixtures also being true. Only 25% of lighting grade factor applied to pot lights
    }
  }

// Assign value of hangingPendantLightCost:  
  if (hangingPendantLightTrue === "yes"){
    hangingPendantLightCost= hangingPendantLightPrice * lightingGradeFactor * 2.5 * kitchenSizeFactor * ((ceilingFactor+1)/2); // assumes quantity of 2.5 fixtures in average sized kitchen. Increased or decreased using kitchenSizeFactor.
  }

// Assign value of diningChandelierCost:  
  if (diningChandelierTrue === "yes"){
    diningChandelierCost= diningChandelierPrice * lightingGradeFactor * ((kitchenSizeFactor+1)/2) * ((ceilingFactor+1)/2); // Assumes only 1 chandelier, but uses 50% of kitchen size factor to help better compensate for size/grade of chandelier
    if (kitchenLightFixtureCost> 0){
      kitchenLightFixtureCost= kitchenLightFixtureCost - (kitchenLightFixturePrice * lightingGradeFactor * ((ceilingFactor+1)/2) ); // Give user credit for cost of 1 fixture as being replaced by chandelier
    }    
  }

// Assign value of ceilingFanCost: 
  if (ceilingFanTrue === "yes"){
    ceilingFanCost= ceilingFanPrice * lightingGradeFactor * ((ceilingFactor+1)/2);
  }

// Assign value of underCabinetLightCost:   
  if (underCabinetLightTrue === "yes"){
    underCabinetLightCost= underCabinetLightPrice * ((((lightingGradeFactor+1)/2)+1)/2) * kitchenSizeFactor; 
  }  

// Assign lightingFinalCost:  
lightingFinalCost= kitchenLightFixtureCost + kitchenPotLightCost + hangingPendantLightCost + diningChandelierCost + ceilingFanCost + underCabinetLightCost + newLightingCost;
 
} // End of updateLightingTrue === "yes" section


// ********************************************************************
// ***** QUESTION # 31 to user - ELECTRICAL UPDATES *****
// ********************************************************************

const electricalUpdatePrice= 19.50;  // price per unit to supply and install new outlet or switch (averages in cost of 1 dimmer switch per ~ 8 units)

let updateElectricalTrue="";

let electricalUpdateCount=0;

updateElectricalTrue = window.prompt("Will the electrical outlets and switches need to be updated in this ${roomTypeName}? (options: yes, no)", "");
  if (updateElectricalTrue === "yes"){
    electricalUpdateCount= (roomSizeSF / 100) * 6.5;
        if (electricalUpdateCount > 18){
          electricalUpdateCount= 18; // max count of 18 for Kitchen/Dining
        }
        else if (electricalUpdateCount< 6){
          electricalUpdateCount= 6; // min value of 6
        }
    
   electricalFinalCost= electricalUpdateCount * electricalUpdatePrice * ((yearBuiltFactor+1)/2);
  }  



// ********************************************************************
// ***** QUESTION # 32 to user - PAINTING *****
// ********************************************************************

const paintingKitchenBasePrice = 2.90;  // Starting base Price (PER SQUARE FOOT OF FLOOR AREA) to re-paint a neutral KITCHEN with neutral 8' ceilings (not including price of all other factors to be assigned to paintingAdditions)

const primeDrywallPrice = 0.45;  // Price per SF of room area to prime walls, this price is for 100% of room SF (will be set to 100%, 50% or 25% of room area, depending on primeDrywallFactor assigned in Drywall Question to user)
const paintBaseboardsPrice = 0.35;  // Price per SF of room area to add painting of baseboards in room
const paintCasingsPrice = 0.35;  // Price per SF of room area to add painting of door and/or window casings in room
const paintWainscottingPrice = 1.00;  // Price per SF of room area to add painting of wainscotting in room
const paintCrownPrice = 0.65;  // Price per SF of room area to add painting of crown moulding in room
const paintInteriorDoorUnitPrice = 85.00;  // Price to paint each interior door unit (slab & jambs), Per Unit Price

let paintingAdditionsPrice = 0; // will be added to when/if certain items are true below. Then gets added to paintingBasePrice for a final per SF rate to paint this room
let paintInteriorDoorUnitsCost =0; // total cost based on number of interior door units that need to be painted multiplied by the price to paint each door unit. Added to cost of painting room per SF.

let paintingTrue="";
let repaintInteriorDoorsTrue="";

let repaintInteriorDoorQty="";

paintingTrue = window.prompt("Will painting of this ${roomTypeName} be required? (options: yes, no)", "");
  if (paintingTrue === "yes"){
    // Assign values to paintingAdditions:
    
    if (replaceFlooringTrue === "yes" || installBaseboardsTrue === "yes"){
      paintingAdditionsPrice= paintingAdditionsPrice + paintBaseboardsPrice;
    }

    if (installWindowCasingsTrue === "yes" || installDoorCasingsTrue === "yes"){
      paintingAdditionsPrice= paintingAdditionsPrice + paintCasingsPrice; 
    }
    if (installWainscottingTrue === "yes"){
      paintingAdditionsPrice= paintingAdditionsPrice + paintWainscottingPrice; 
    }
    if (installCrownTrue === "yes"){
      paintingAdditionsPrice= paintingAdditionsPrice + paintCrownPrice; 
    }
    
  // Assign cost to paintInteriorDoosUnitCost:
    if (replaceInteriorDoorsTrue === "yes"){
      paintInteriorDoorUnitsCost= interiorDoorCount * paintInteriorDoorUnitPrice;
    }
    else {
      repaintInteriorDoorsTrue = window.prompt("Will re-painting of any existing door units be required in this ${roomTypeName}? (options: yes, no)", "");
        if (repaintInteriorDoorsTrue === "yes"){
          repaintInteriorDoorQty = window.prompt("Approximately how many door units? (options: selection of 1 to 12, not sure)", "1");
            if (repaintInteriorDoorQty === "not sure"){
              repaintInteriorDoorQty= approxInteriorDoorCount; 
            }
            else {
              repaintInteriorDoorQty= parseInt(repaintInteriorDoorQty); // assign number entered by user
            }
          
          paintInteriorDoorUnitsCost= repaintInteriorDoorQty * paintInteriorDoorUnitPrice * yearBuiltFactor;
        }
    }
  paintingFinalCost= ((paintingKitchenBasePrice + paintingAdditionsPrice) * ((yearBuiltFactor+1)/2) * (roomSizeSF + additionalWalkInPantrySpaceSF)  * ceilingFactor) + paintInteriorDoorUnitsCost; // calculates cost of painting, if applicable -- note cost to paint ceiling should be included in re-finish ceilings section, NOT here!
 }  


 // ***** SUBTOTAL ***** :

roomSum= // Get a subtotal of cost to be used as part of Question regarding Design Help:

  wallRemovalFinalCost
+ changeKitchenLayoutFinalCost
+ constructNewPantryFinalCost
+ windowFinalCost
+ exteriorDoorFinalCost
+ interiorDoorFinalCost
+ cabinetsFinalCost
+ countertopFinalCost
+ backsplashFinalCost
+ sinkFinalCost
+ faucetFinalCost
+ dishwasherFinalCost
+ garburatorFinalCost
+ fridgeLineFinalCost
+ rangeHoodFinalCost
+ cookTopFinalCost
+ wallOvenFinalCost
+ gasLineConnectionFinalCost
+ ceilingFinalCost 
+ flooringFinalCost
+ mouldingsFinalCost
+ railingsFinalCost
+ lightingFinalCost
+ electricalFinalCost
+ paintingFinalCost;


// ********************************************************************
// ***** QUESTION # 33 to user  - DESIGN HELP *****
// ********************************************************************

const designHelpBaseFeePrice= 315.00 // base fee added to designHelpPrice, this fee should only be inlcuded ONCE if design help is requested for multiple room calculations

let designHelpTrue ="";

let designHelpCalculatedFee=0; // will remain at $0.00 if user selects "No"

designHelpTrue = window.prompt("Will you likely require an interior designer to help select products, fixtures, and colours for this ${roomTypeName}? (options: No, I'm able to make my own selections; Maybe, I may require some help; Yes, I will likely need a lot of assistance)", "");
  if (designHelpTrue === "Maybe"){
    designHelpCalculatedFee= roomSum * 0.02; // 2% of total cost
  }
  else if (designHelpTrue === "Yes"){
    designHelpCalculatedFee= roomSum * 0.04; // 4% of total cost
  }
  
  if (designHelpTrue === "Maybe" || designHelpTrue === "Yes"){
    if (designHelpCalculatedFee > 2200){
      designHelpCalculatedFee = 2200; // assign max value of $2,200 for Kitchens
    }
    designerFinalCost= designHelpCalculatedFee + designHelpBaseFeePrice;
    
    // Add in the cost of design help to current value of room sum if neccesary:
    roomSum = roomSum + designerFinalCost; 
  }


// ********************************************************************
// ********** FINAL CALCULATION FOR KITCHEN: **********
// ********************************************************************

// CALCULATE GENERAL COSTS:

// General Cost Prices:
const generalDisposalPrice= 999.99; // General price for per pick-up truck load (includes travel, landfill fees, and labour). Applied to LARGER sized projects in increments (per $ chunk). NOTE: Direct costs related to disposal should be included in those specific task prices, this is for general clean-up & disposal throughout larger sized projets.
const kitchenFloorProtectionMaskingPrice= 999.99; // Price to mask for dust, and protect flooring. Changes slightly based on floor level of project and size of kitchen.
const kitchenFinalCleaningPrice= 999.99; // Price to final clean average sized kitchen, increased or decresased slightly based on size

// Only apply general costs if roomSum > $8,000, otherwise skip this section
if (roomSum > 8000){

// Assign value for generalDisposalCost:
let generalDisposalFactor= roomSum / 15000; // assumes 1 additional truck load of disposal required per $15,000 of kitchen project cost
if (generalDisposalFactor > 2.5){
  generalDisposalFactor= 2.5; // max value of 2.5 additional truckloads required for a kitchen
}
generalDisposalCost= generalDisposalPrice * generalDisposalFactor;

// Assign value for floorProtectionMaskingCost:
let floorProtectionMaskingSizeFactor= roomSizeSF / 180; // divide by 256 for living rooms
if (floorProtectionMaskingSizeFactor > 1.50){
  floorProtectionMaskingSizeFactor= 1.50; // max value of 1.50
}
else if (floorProtectionMaskingSizeFactor < 0.70){
  floorProtectionMaskingSizeFactor= 0.70; // min value of 0.70
}
floorProtectionMaskingCost= kitchenFloorProtectionMaskingPrice * floorProtectionMaskingSizeFactor * floorProtectionMaskingLevelFactor;

// Assign value for finalCleaningCost:
let finalCleaningSizeFactor= roomSizeSF / 180;
if (finalCleaningSizeFactor > 1.50){
  finalCleaningSizeFactor= 1.50; // max value of 1.50
}
else if (finalCleaningSizeFactor < 0.75){
  finalCleaningSizeFactor= 0.75; // min value of 0.75
}
finalCleaningCost= kitchenFinalCleaningPrice * finalCleaningSizeFactor;


// Add in general Costs:
roomSum= roomSum 
+ generalDisposalCost
+ floorProtectionMaskingCost
+ finalCleaningCost;

} // End of roomSum > 8,000 section


// Apply Global project management fee percentage, set by admin:
roomSum= roomSum * projectManagementFactor;

// Apply Acute discount or inflation percentage to final price for this type of room calculator:
roomSum= roomSum * kitchenDiscountInflationFactor;

let roomPriceLow= roomSum*0.94 // 6% less than average price
let roomPriceHigh= roomSum*1.04 // 4% Higher than average price

let roomPriceAverage= Math.round(roomSum / 20)*20 // Rounds to nearest 20
roomPriceLow= Math.round(roomPriceLow / 20)*20 // Rounds to nearest 20
roomPriceHigh= Math.round(roomPriceHigh / 20)*20 // Rounds to nearest 20  


// ********************************************************************
// Testing output -- not to be included in final application
// ********************************************************************

console.log(`Cost for WALL REMOVAL is $ ${wallRemovalFinalCost}.`)
console.log(`Cost for CHANGING KITCHEN LAYOUT is $ ${changeKitchenLayoutFinalCost}.`)
console.log(`Cost for CONSTRUCTING NEW PANTRY is $ ${constructNewPantryFinalCost}.`)
console.log(`Cost for WINDOWS is $ ${windowFinalCost}.`)
console.log(`Cost for EXTERIOR DOORS is $ ${exteriorDoorFinalCost}.`)
console.log(`Cost for INTERIOR DOORS is $ ${interiorDoorFinalCost}.`)
console.log(`Cost for CABINETS is $ ${cabinetsFinalCost}.`)
console.log(`Cost for COUNTERTOPS is $ ${countertopFinalCost}.`)
console.log(`Cost for BACKSPLASH is $ ${backsplashFinalCost}.`)
console.log(`Cost for KITCHEN SINK(S) is $ ${sinkFinalCost}.`)
console.log(`Cost for KITCHEN FAUCET(S) is $ ${faucetFinalCost}.`)
console.log(`Cost for DISHWASHER(S) is $ ${dishwasherFinalCost}.`)
console.log(`Cost for GARBURATOR(S) is $ ${garburatorFinalCost}.`)
console.log(`Cost for FRIDGE WATER LINE is $ ${fridgeLineFinalCost}.`)
console.log(`Cost for RANGE HOOD INSTALLATION is $ ${rangeHoodFinalCost}.`)
console.log(`Cost for COOKTOP INSTALLATION is $ ${cookTopFinalCost}.`)
console.log(`Cost for WALL OVEN INSTALLATION is $ ${wallOvenFinalCost}.`)
console.log(`Cost for GAS LINES is $ ${gasLineConnectionFinalCost}.`)
console.log(`Cost for CEILINGS is $ ${ceilingFinalCost}.`)
console.log(`Cost for FLOORING is $ ${flooringFinalCost}.`)
console.log(`Cost for MOULDINGS & MILLWORK is $ ${mouldingsFinalCost}.`)
console.log(`Cost for RAILINGS is $ ${railingsFinalCost}.`)
console.log(`Cost for LIGHTING is $ ${lightingFinalCost}.`)
console.log(`Cost for ELECTRICAL UPGRADES is $ ${electricalFinalCost}.`)
console.log(`Cost for PAINTING is $ ${paintingFinalCost}.`)
console.log(`Cost for DESIGNER HELP is $ ${designerFinalCost}.`)
console.log(`Cost for GENERAL DISPOSAL is $ ${generalDisposalCost}.`)
console.log(`Cost for FLOOR PROTECTION is $ ${floorProtectionMaskingCost}.`)
console.log(`Cost for FINAL CLEANING is $ ${finalCleaningCost}.`)

console.log();// blank space

console.log(`The un-rounded total is $${roomSum}.`)
console.log(`The total rounded to nearest $20 is $${roomPriceAverage}.`);
console.log(`The total estimated cost of your ${floorLevelName} ${roomTypeName} renovation is $${roomPriceLow} to ${roomPriceHigh}.`);


// ************************************************************************************
// ********** FINAL STRING PRINOUTS: **********
// ************************************************************************************
let generalNotesString="NOTES: \n\n";

generalNotesString= generalNotesString + "Allowances have been allocated for all required fixtures, finishes, and materials based on the type and grade that was specified. Final quote may vary based on actual physical selections.\n\n"

generalNotesString= generalNotesString + "Supply of new appliances including fridge, range (stove), microwave"
if (installDishwasherTrue === "Yes"){
  generalNotesString= generalNotesString + ", dishwasher"
}
if (installGarburatorTrue === "Yes"){
  generalNotesString= generalNotesString + ", garburator"
}
if (installRangeHoodTrue === "Yes"){
  generalNotesString= generalNotesString + ", rangehood"
}
if (installCookTopTrue === "Yes"){
  generalNotesString= generalNotesString + ", cooktop"
}
if (installWallOvenTrue === "Yes"){
  generalNotesString= generalNotesString + ", & wall oven"
}
generalNotesString= generalNotesString + " are not included in estimate. All other fixtures and materials are included in this price.\n\n"

if (relocateKitchenElectricalTrue=== "Yes"){
  generalNotesString= generalNotesString + "- Estimate assumes there is adequate space remaining in the electrical breaker panel if required. Extra costs may be required if deemed inadequate. \n"
  generalNotesString= generalNotesString + "- Estimate assumes there is adequate access to rough-in new electrical back to panel if required. Extra costs may be required if access is limited or restricted. \n"
}

if (anyGasLineRoughInRequiredTrue === "Yes"){
  generalNotesString= generalNotesString + "- Estimate assumes there is adequate access to rough-in new gas line(s). Extra cost may be required if access is limited or restricted. \n"
}

if (refinishCeilingTrue === "yes"){
  generalNotesString= generalNotesString + "- Refinishing of the ceiling is only included for the {roomTypeNameSingular} area in this estimate. Extra costs will be associated with finishing extended ceiling area(s) if required. \n"
}

if (skyType === "Replace or Repair existing skylight(s)"){
  generalNotesString= generalNotesString + "- Any roof/attic repairs required due to faulty existing skylights are not currently included in this estimate. \n"
}

// ASBESTOS DISCLAIMER:
// If house built in 1980's:
if (yearBuiltFactor === 1.14){
  generalNotesString= generalNotesString + "\n*** Due to the year this house was constructed, there is a low to moderate risk for some materials to contain asbestos. Testing of potentially hazardous materials may be required. Asbestos testing and any required removal/remediation is not yet included in this estimate.\n"
}

// Else if house built in 1970's:
else if (yearBuiltFactor === 1.18){
  generalNotesString= generalNotesString + "\n*** Due to the year this house was constructed, there is a moderate risk for some materials to contain asbestos. Testing of potentially hazardous materials may be required. Asbestos testing and any required removal/remediation is not yet included in this estimate.\n"
}

// Else if house built in 1960's:
else if (yearBuiltFactor === 1.22){
  generalNotesString= generalNotesString + "\n*** Due to the year this house was constructed, there is a moderate to high risk for some materials to contain asbestos. Testing of potentially hazardous materials may be required. Asbestos testing and any required removal/remediation is not yet included in this estimate.\n"
}

// Else if house built PRE 1960's:
else if (yearBuiltFactor > 1.22){
  generalNotesString= generalNotesString + "\n*** Due to the year this house was constructed, there is a high risk for some materials to contain asbestos. Testing of potentially hazardous materials may be required. Asbestos testing and any required removal/remediation is not yet included in this estimate.\n"
}

console.log(); // Blank Space
console.log("***************************************************************************");
console.log(); // Blank Space
console.log(generalNotesString);
