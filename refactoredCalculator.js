class KitchenRenovationCalculator {

	// ********************************************************************
	// ***** BEGINNING OF QUESTIONS *****
	// ********************************************************************

	// ********************************************************************
	// ***** QUESTION # 01 to user - FLOOR LEVEL *****
	// ********************************************************************

	setKitchenFloorLevelAnswer(floorLevelName) {
		if (['upper level', 'main level', 'lower level', 'basement level'].includes(floorLevelName)) {
			this.floorLevelName = floorLevelName;
		}

		switch (this.floorLevelName) {
			case 'upper level':
				this.chimneyLevelFactor = 1.00;
				this.plumbingLevelFactor = 1.08;
				this.windowLevelFactor = 1.07;
				this.floorProtectionMaskingLevelFactor = 1.20;
				break;

			case 'main level':
				this.chimneyLevelFactor = 1.50;
				this.plumbingLevelFactor = 1.00;
				this.windowLevelFactor = 1.00;
				this.floorProtectionMaskingLevelFactor = 1.00;
				break;

			case 'lower level':
				this.chimneyLevelFactor = 2.00;
				this.plumbingLevelFactor = 1.12;
				this.windowLevelFactor = 0.95;
				this.floorProtectionMaskingLevelFactor = 1.10;
				break;

			case 'basement level':
				this.chimneyLevelFactor = 2.25;
				this.plumbingLevelFactor = 1.15;
				this.windowLevelFactor = 0.85;
				this.floorProtectionMaskingLevelFactor = 1.15;
				break;

			default:
				alert('Invalid Floor Level Name');
		}
	}

	// ********************************************************************
	// ***** QUESTION # 02 to user - YEAR HOUSE BUILT *****
	// ********************************************************************

	setHouseBuiltYearAnswer(yearBuilt) {
		if (yearBuilt > 2019) {
			this.yearBuiltFactor = 1.00; // neutral for homes built in 2020s
		} else if (yearBuilt > 2009 && yearBuilt < 2020) {
			this.yearBuiltFactor = 1.03; // 3% higher for homes built in 2010s
		} else if (yearBuilt > 1999 && yearBuilt < 2010) {
			this.yearBuiltFactor = 1.06; // 6% higher for homes built in 2000s
		} else if (yearBuilt > 1989 && yearBuilt < 2000) {
			this.yearBuiltFactor = 1.10; // 10% higher for homes built in 1990s
		} else if (yearBuilt > 1979 && yearBuilt < 1990) {
			this.yearBuiltFactor = 1.14; // 14% higher for homes built in 1980s
		} else if (yearBuilt > 1969 && yearBuilt < 1980) {
			this.yearBuiltFactor = 1.18; // 18% higher for homes built in 1970s
		} else if (yearBuilt > 1959 && yearBuilt < 1970) {
			this.yearBuiltFactor = 1.22; // 22% higher for homes built in 1960s
		} else if (yearBuilt > 1949 && yearBuilt < 1960) {
			this.yearBuiltFactor = 1.26; // 26% higher for homes built in 1950s
		} else if (yearBuilt > 1939 && yearBuilt < 1950) {
			this.yearBuiltFactor = 1.30; // 30% higher for homes built in 1940s
		} else if (yearBuilt > 1929 && yearBuilt < 1940) {
			this.yearBuiltFactor = 1.34; // 34% higher for homes built in 1930s
		} else if (yearBuilt > 1919 && yearBuilt < 1930) {
			this.yearBuiltFactor = 1.38; // 38% higher for homes built in 1920s
		} else if (yearBuilt > 1909 && yearBuilt < 1920) {
			this.yearBuiltFactor = 1.40; // 40% higher for homes built in 1910s
		} else if (yearBuilt > 1899 && yearBuilt < 1910) {
			this.yearBuiltFactor = 1.40; // 40% higher for homes built in 1900s
		} else if (yearBuilt < 1900) {
			this.yearBuiltFactor = 1.40; // 40% higher for homes built pre 1900s
		} else {
			alert("Invalid year selection")
		}
	}

	// ********************************************************************
	// ***** QUESTION # 03 to user - INCLUDE DINING ROOM/AREA? *****
	// ********************************************************************  

	setIncludeDiningAnswer(includeDining) {
		this.includeDining = includeDining;
		if (this.includeDining) {
			this.roomTypeName = "Kitchen/Dining Area";

		} else {
			this.roomTypeName = "Kitchen";
		}
		this.roomTypeNameSingular = this.roomTypeName;
	}

	// ********************************************************************
	// ***** QUESTION # 04 to user - ROOM SIZE *****
	// ********************************************************************

	// User should be asked to enter square footage between 60 to 600 inclusive
	// User should also be given option to select "Not Sure", at which point they should be given selections of Tiny, small, average, large, extra large, huge
	setRoomSizeAnswer(notSure, size, relativeSize, diningSize, notSureDiningSize, diningRelativeSize) {
		this.diningSizeSF = 0
		if (notSure) {
			switch (relativeSize) {
				case "Tiny":
					this.kitchenSizeSF = 70;
					break;

				case "Small":
					this.kitchenSizeSF = 100;
					break;

				case "Average":
					this.kitchenSizeSF = 140;
					break;

				case "Large":
					this.kitchenSizeSF = 170;
					break;

				case "Extra Large":
					this.kitchenSizeSF = 200;
					break;

				case "Huge":
					this.kitchenSizeSF = 280;
					break;

				default:
					alert('Invalid relative size')
			}
		} else {
			this.kitchenSizeSF = size
		}

		// roomWallFactor is a calculated factor that will be used for single wall calculations, i.e. instances where overall square footage makes less sense. 
		// Set to neutral value of 1.00 when living room size is === 256 Square Feet. Assumes a smaller wall feature wall as square footage drops below 256, and larger as square footage moves above 256 SF.
		this.roomWallFactor = ((this.kitchenSizeSF - 144) * 0.00125) + 1;
		if (this.roomWallFactor > 1.50) {
			this.roomWallFactor = 1.50; // assign max value of 1.50 to roomWallFactor for kitchens
		}

		// ASSIGN VALUE OF kitchenSizeFactor:
		this.kitchenSizeFactor = (this.kitchenSizeSF / 180) + 0.222;
		if (this.kitchenSizeFactor > 1.50) {
			this.kitchenSizeFactor = 1.50; // Assign max value of 1.50
		} else if (this.kitchenSizeFactor < 0.85) {
			this.kitchenSizeFactor = 0.85; // Assign min value of 0.85
		}
		// diningSize, diningRelativeSize
		if (this.includeDining) {
			if (!notSureDiningSize) {
				this.diningSizeSF = diningSize
			} else {
				switch (diningRelativeSize) {
					case "Tiny":
						this.diningSizeSF = 60;
						break;

					case "Small":
						this.diningSizeSF = 80;
						break;

					case "Average":
						this.diningSizeSF = 100;
						break;

					case "Large":
						this.diningSizeSF = 140;
						break;

					case "Extra Large":
						this.diningSizeSF = 288;
						break;

					case "Huge":
						this.diningSizeSF = 400;
						break;

					default:
						alert('Invalid dining relative size')
				}
			}
		}

		this.roomSizeSF = this.kitchenSizeSF + this.diningSizeSF;
	}

	// ********************************************************************
	// ***** QUESTION # 05 to user - CEILING HEIGHT *****
	// ********************************************************************
	setCeilingHeightAnswer(notSure, ceilingHeight) {
		if (notSure) {
			this.ceilingHeight = 8.5; // assign a value to ceilingHeight to be used in later calculations
			this.ceilingFactor = 1.05;
		} else {
			switch (parseInt(ceilingHeight)) {
				case 7:
					this.ceilingHeight = 8; // assign minimum height of 8 feet for doing calculation
					this.ceilingFactor = 1.00;
					break;

				case 8:
					this.ceilingFactor = 1.00;
					break;

				case 9:
					this.ceilingFactor = 1.15;
					break;

				case 10:
					this.ceilingFactor = 1.35;
					break;

				case 11:
					this.ceilingFactor = 1.45;
					break;

				case 12:
					this.ceilingFactor = 1.60;
					break;

				case 16:
					this.ceilingFactor = 2.05;
					break;

				default:
					alert('Invalid Selection')
			}
		}

	}

	// ********************************************************************
	// ***** QUESTION # 06 to user - CEILING VAULTED? *****
	// ********************************************************************
	setIsCeilingVaultedAnswer(isVaulted) {
		if (isVaulted) {
			this.vaultFactor = 1.2
		} else {
			this.vaultFactor = 1.08 // only happen when user isn't sure
		}
		this.ceilingFactor = (this.ceilingFactor * this.vaultFactor);
	}

	// ********************************************************************
	// ***** QUESTION # 07 to user - WALL REMOVAL *****
	// ********************************************************************
	setwallRemovalAnswer(removeWall, loadBearingAnswer, floorAboveAnswer, removeChimney, brickChimneyAnswer, expandRoomSize, expandSize, notSureExpandSize, roomSizePercentLarger) {
		const removeLoadBearingWallPrice = 6800.00;
		const removeNonLoadBearingWallPrice = 1250.00;

		const removeMetalChimneyPrice = 600.00; // Price to remove a metal chimney for 1 storey of flooring in average conditions
		const removeBrickChimneyPrice = 1500.00; // Price to remove a brick chimney for 1 storey of flooring in average conditions

		this.removeWallCost = 0; // if removeWallTrue === "no", removeWallCost will remain at $0.00
		this.removeChimneyCost = 0;
		this.floorAboveFactor = 1.00;
		this.extraRoomSizeSF = 0;
		this.removeWall = removeWall

		switch (loadBearingAnswer) {
			case "yes":
				if (floorAboveAnswer === "yes") {
					this.floorAboveFactor = 1.12;
				}
				
				this.removeWallCost = removeLoadBearingWallPrice * this.floorAboveFactor * ((this.yearBuiltFactor + 1) / 2);
				break;

			case "no":
				this.removeWallCost = removeNonLoadBearingWallPrice;
				break;

			case "not sure":
				if (this.floorLevelName === "basement level" && this.yearBuiltFactor < 1.26) { // i.e. built in 1960's or newer
					this.removeWallCost = removeNonLoadBearingWallPrice;

				} else if (this.yearBuiltFactor > 1.10) { // i.e. built before 1990
					this.removeWallCost = removeNonLoadBearingWallPrice * 2; // double price if built 1989 or earlier than for a definite non-load bearing wall removal price  
				} else {
					this.removeWallCost = removeNonLoadBearingWallPrice * 1.25; // 25% Higher if built 1990 or newer
				}

				break;
			default:
				alert('Invalid load bearing answer')
		}

		if (removeChimney) {
			switch (brickChimneyAnswer) {
				case "yes":
					this.removeChimneyCost = removeBrickChimneyPrice * ((this.yearBuiltFactor + 1) / 2) * this.chimneyLevelFactor * this.ceilingFactor;
					break;

				case "no":
					this.removeChimneyCost = removeMetalChimneyPrice * ((this.yearBuiltFactor + 1) / 2) * this.chimneyLevelFactor * this.ceilingFactor;
					break;

				case "not sure":
					this.removeChimneyCost = removeMetalChimneyPrice * 1.25 * ((this.yearBuiltFactor + 1) / 2) * this.chimneyLevelFactor * this.ceilingFactor; // 25% higher than standard metal chimney price if "not sure" selected by user
					break;

				default:
					alert('Invalid brick chimney answer')
			}
		}

		this.wallRemovalFinalCost = (this.removeWallCost * this.yearBuiltFactor * this.roomWallFactor * this.ceilingFactor) + this.removeChimneyCost; // Calculates cost to remove / relocate wall if required // Note yearBuiltFactor is used multiple times in load bearing walls which is correct
		if (expandRoomSize) {
			if (!notSureExpandSize) {
				this.extraRoomSizeSF = expandSize;
			} else {
				switch (roomSizePercentLarger) {
					case "Approximately 10% larger":
						this.extraRoomSizeSF = (this.roomSizeSF * 0.10);
						break;

					case "Approximately 25% larger":
						this.extraRoomSizeSF = (this.roomSizeSF * 0.25);
						break;

					case "Approximately 50% large":
						this.extraRoomSizeSF = (this.roomSizeSF * 0.50);
						break;

					case "Approximately 75% larger":
						this.extraRoomSizeSF = (this.roomSizeSF * 0.75);
						break;

					case "Approximately Double the size":
						this.extraRoomSizeSF = this.roomSizeSF;
						break;

					default:
						alert('Invalid room size percent larger')
				}
			}
			this.roomSizeSF = this.roomSizeSF + this.extraRoomSizeSF; // Adds the additional square footage from the expansion on to existing value of overall square footage of roomSizeSF
			this.roomWallFactor = ((this.roomSizeSF - 144) * 0.00125) + 1 // Re-calculates roomWallFactor based on adding in extraRoomSizeSF square footage, if applicable
			if (this.roomWallFactor > 1.50) {
				this.roomWallFactor = 1.50; // Still assign max value of 1.50 to livingWallFactor
			}
		}
	}

	// ********************************************************************
	// ***** QUESTION # 08 to user - LAYOUT *****
	// ********************************************************************
	setLayoutAnswer(changeKitchenLayout, relocateKitchenElectrical, relocateKitchenPlumbing) {
		const changeKitchenLayoutPrice = 999.99; // Price to remove drywall, R&R insulation, Install new drywall on walls, Mud & tape drywall, Prime Drywall
		const relocateKitchenElectricalPrice = 999.99; // Price to relocate kitchen electrical layout in average sized kitchen, in neutral conditions
		const relocateKitchenPlumbingPrice = 999.99; // Price to relocate kitchen plumbing layout (sink, dishwasher, water lines, venting, etc) in average sized kitchen in average/neutral conditions 

		this.changeKitchenLayoutCost = 0;
		this.relocateKitchenElectricalCost = 0;
		this.relocateKitchenPlumbingCost = 0;

		if (this.removeWall === true) {
			if (changeKitchenLayout) {
				this.changeKitchenLayoutCost = changeKitchenLayoutPrice * this.kitchenSizeFactor * this.plumbingLevelFactor * ((this.yearBuiltFactor + 1) / 2);
			}

			if (relocateKitchenElectrical) {
				this.relocateKitchenElectricalCost = relocateKitchenElectricalPrice * ((this.kitchenSizeFactor + 1) / 2) * ((this.yearBuiltFactor + 1) / 2);
			}

			if (relocateKitchenPlumbing) {
				this.relocateKitchenPlumbingCost = relocateKitchenPlumbingPrice * this.plumbingLevelFactor * ((this.kitchenSizeFactor + 1) / 2) * ((this.yearBuiltFactor + 1) / 2);
			}
		} else {
			if (relocateKitchenPlumbing) {
				this.relocateKitchenPlumbingCost = relocateKitchenPlumbingPrice * this.plumbingLevelFactor * ((this.kitchenSizeFactor + 1) / 2) * ((this.yearBuiltFactor + 1) / 2);
			}
		}
		this.changeKitchenLayoutFinalCost = this.changeKitchenLayoutCost + this.relocateKitchenElectricalCost + this.relocateKitchenPlumbingCost;
	}

	// ********************************************************************
	// ***** QUESTION # 09 to user - PANTRY/CLOSET *****
	// ********************************************************************
	setPantryClosetAnswer(pantryPreExisting, pantryLocation, pantryType, pantrySize) {
		const constructNewPantryPrice = 999.99; // Price to frame, board, tape, and install standard shelving in average sized pantry

		this.newPantrySizeFactor = 1.00; // Set to neutral for average sized pantry. Used as multiplying factor based on size of new pantry to be built
		this.pantryFootprintFactor = 1.00;
		this.pantryTypeFactor = 1.00; // walk-in or reach-in?
		this.pantryFootprint = 0; // Linear footage of cabinets, counters, and splash tile occupied by pantry to be subtracted from quantity of cabinets, countertops, and splash tile (if applicable depending on type)

		switch (pantryLocation) {
			case "Corner between cabinets":
				this.pantryFootprint = 5.25; // 5.25 linear feet occupied by average sized corner pantry
				break;

			case "End of cabinets":
				this.pantryFootprint = 2.75; // 2.75 linear feet occupied by average sized end pantry    
				break;

			case "Away from cabinets":
				this.pantryFootprint = 0; // 0 linear feet occupied by average sized pantry away from cabinets  
				break;

			case "Other":
				this.pantryFootprint = 1.5; // Assume 1.5 linear feet occupied by average sized "other" pantry
				break;

			default:
				alert('Invalid pantry location')

		}


		switch (pantrySize) {
			case "Small":
				this.newPantrySizeFactor = 0.85;
				this.pantryFootprintFactor = 0.9;
				break;

			case "Average":
				this.newPantrySizeFactor = 1.00;
				this.pantryFootprintFactor = 1.00;
				break;

			case "Large":
				this.newPantrySizeFactor = 1.20;
				this.pantryFootprintFactor = 1.10;
				break;

			default:
				alert('Invalid pantry size')
		}


		if (pantryLocation === "Away from cabinets" || pantryLocation === "Other") {
			if (pantryType === "Walk-in") {
				if (pantrySize === "Small") {
					this.additionalWalkInPantrySpaceSF = 20;
				} else if (pantrySize === "Average") {
					this.additionalWalkInPantrySpaceSF = 30;
				} else if (pantrySize === "Large") {
					this.additionalWalkInPantrySpaceSF = 40;
				}
			}
		}

		this.pantryFootprint = this.pantryFootprint * this.pantryFootprintFactor;

		if (pantryPreExisting) {
			this.constructNewPantryFinalCost = constructNewPantryPrice * newPantrySizeFactor * ((this.ceilingFactor + 1) / 2) * ((this.yearBuiltFactor + 1) / 2);
		}

	}


	// ********************************************************************
	// ***** QUESTION # 10 to user - WINDOWS *****    
	// ********************************************************************
	setWindowsAnswer(replaceWindows, windowGrade, newWindowOpening, installWindowBlinds, windowBlindGrade, smallWindowCount, mediumWindowCount, largeWindowCount, windowBlindCount) {
		const smallWindowPrice = 875.00; // price to supply & install 1 small window in neutral conditions
		const mediumWindowPrice = 980.00; // price to supply & install 1 medium window in neutral conditions
		const largeWindowPrice = 1250.00; // price to supply & install 1 large window in neutral conditions

		const singleWindowInstallBaseFee = 125.00; // Base Fee - extra price added if only 1 window to install for covering overhead (helps pay for measuring, sourcing, delivery, tool set-up, etc if only 1 window)
		const newWindowOpeningPrice = 1100.00 // price to create 1 new window opening or enlarge 1 existing opening (i.e. cut hole in exterior, add lintel, etc), for average sized window in average conditions

		const smallWindowBlindPrice = 80.00; // Price to supply & install 1 average grade window blind for 1 small sized window
		const mediumWindowBlindPrice = 120.00; // Price to supply & install 1 average grade window blind for 1 medium sized window
		const largeWindowBlindPrice = 160.00; // Price to supply & install 1 average grade window blind for 1 large sized window

		let totalWindowCount = 0; // holds total number of windows to be installed for this room
		let newWindowOpeningCount = 0; // holds total number of new window openings that will need to be created or enlarged (i.e. cut hole in exterior and frame lintel, including average exterior alterations, etc)
		this.approxWindowCount = this.roomSizeSF / 90; // approximates number of average sized windows in a living room. Used ONLY for calculating window treatments if windows are not being replaced. 
		if (this.approxWindowCount > 7) {
			this.approxWindowCount = 7; // assign max value of 7 to approxWindowCount
		}

		this.windowGradeFactor = 1.00; // multiplying factor for grade of windows desired by user
		this.windowBlindGradeFactor = 1.00 // multiplying factor for grade of windows blinds desired by user

		let smallWindowCost = 0;
		let mediumWindowCost = 0;
		let largeWindowCost = 0;
		let newWindowOpeningCost = 0; // total cost based on number of new window openings to be created
		let smallWindowBlindCost = 0;
		let mediumWindowBlindCost = 0;
		let largeWindowBlindCost = 0;
		let totalWindowBlindCost = 0;

		if (replaceWindows) {
			switch (windowGrade) {
				case "Bronze":
					this.windowGradeFactor = 0.90;
					break;

				case "Silver":
					this.windowGradeFactor = 1.00; // neutral factor for average
					break;

				case "Gold":
					this.windowGradeFactor = 1.25;
					break;

				case "Platinum":
					this.windowGradeFactor = 1.50;
					break;

				default:
					alert('Invalid window grade')
			}

			smallWindowCost = smallWindowCount * smallWindowPrice * this.windowGradeFactor * this.windowLevelFactor * ((this.yearBuiltFactor + 1) / 2); // multiply # of small windows by constant price per small window
			mediumWindowCost = mediumWindowCount * mediumWindowPrice * this.windowGradeFactor * this.windowLevelFactor * ((this.yearBuiltFactor + 1) / 2); // multiply # of medium windows by constant price per medium window
			largeWindowCost = largeWindowCount * largeWindowPrice * this.windowGradeFactor * this.windowLevelFactor * ((this.yearBuiltFactor + 1) / 2); // multiply # of large windows by constant price per large window
			totalWindowCount = smallWindowCount + mediumWindowCount + largeWindowCount; // assigns total number of windows to be installed for this room

			if (newWindowOpening) {
				newWindowOpeningCost = newWindowOpeningCount * newWindowOpeningPrice * this.windowLevelFactor * ((this.yearBuiltFactor + 1) / 2);
			}

			if (installWindowBlinds) {
				switch (windowBlindGrade) {
					case "Bronze":
						this.windowBlindGradeFactor = 0.80;
						break;

					case "Silver":
						this.windowBlindGradeFactor = 1.00; // neutral factor for average
						break;

					case "Gold":
						this.windowBlindGradeFactor = 1.50;
						break;

					case "Platinum":
						this.windowBlindGradeFactor = 2.25;
						break;

					default:
						alert('Invalid window blind grade')
				}
				smallWindowBlindCost = smallWindowCount * smallWindowBlindPrice * this.windowBlindGradeFactor;
				mediumWindowBlindCost = mediumWindowCount * mediumWindowBlindPrice * this.windowBlindGradeFactor;
				largeWindowBlindCost = largeWindowCount * largeWindowBlindPrice * this.windowBlindGradeFactor;
				totalWindowBlindCost = smallWindowBlindCost + mediumWindowBlindCost + largeWindowBlindCost;
			}

			this.windowFinalCost = smallWindowCost + mediumWindowCost + largeWindowCost + newWindowOpeningCost + totalWindowBlindCost; // calculates cost of window replacements, if applicable
			if (totalWindowCount < 2) {
				this.windowFinalCost = this.windowFinalCost + singleWindowInstallBaseFee; // add the base install fee to total cost if only 1 window is to be installed
			} else if (totalWindowCount > 3) {
				this.windowFinalCost = this.windowFinalCost * 0.94; // 6% discount once installing 4 or more windows
			}
		}

		if (replaceWindows === false) {
			if (installWindowBlinds) {
				if (windowBlindCount === "not sure") {
					windowBlindCount = this.approxWindowCount;
				} else {
					windowBlindCount = parseInt(windowBlindCount);
				}
				switch (windowBlindGrade) {
					case "Bronze":
						this.windowBlindGradeFactor = 0.80;
						break;

					case "Silver":
						this.windowBlindGradeFactor = 1.00; // neutral factor for average
						break;

					case "Gold":
						this.windowBlindGradeFactor = 1.50;
						break;

					case "Platinum":
						this.windowBlindGradeFactor = 2.25;
						break;

					default:
						alert('Invalid window blind grade')

				}
				this.totalWindowBlindCost = windowBlindCount * mediumWindowBlindPrice * this.windowBlindGradeFactor; // use the price for medium sized window blinds in this case to get an average price without asking additional window size questions
				this.windowFinalCost = this.totalWindowBlindCost;
			}
		}


	}

	// ********************************************************************
	// ***** QUESTION # 11 to user - REMOVE WINDOWS *****    
	// ********************************************************************
	setEliminateWindowsAnswer(eliminateWindowQty) {
		const eliminateWindowPrice = 240.00; // Price to remove, dipose, frame, insulate, patch sheathing, and patch drywall for average size window in average conditions. Exterior Finishing NOT included in price
		this.eliminateWindowCost = eliminateWindowPrice * eliminateWindowQty * ((this.yearBuiltFactor + 1) / 2);
		
		// Add emliminate window cost into total overall price for windows:
		this.windowFinalCost = this.windowFinalCost + this.eliminateWindowCost;
	}

	// ********************************************************************
	// ***** QUESTION # 12 to user - EXTERIOR DOORS *****
	// ********************************************************************
	setReplaceExteriorDoorsAnswer(exteriorDoorCount, exteriorDoorGrade, newDoorOpening, newDoorOpeningCount) {
		const exteriorDoorPrice= 1680.00; // base cost for replacement of 1 average exterior door unit. Includes removal and disposal of existing. Includes lockset.
		const newDoorOpeningPrice= 1200.00; // price to create or enlarge 1 new exterior door opening (i.e. cut hole in exterior, add lintel, etc)

		let newDoorOpeningCost=0; // total cost based on number of new exterior door openings to be created

		switch (exteriorDoorGrade) {
			case "Bronze":
				this.exteriorDoorGradeFactor = 0.85;
				break;

			case "Silver":
				this.exteriorDoorGradeFactor = 1.00;
				break;

			case "Gold":
				this.exteriorDoorGradeFactor = 1.35;
				break;

			case "Platinum":
				this.exteriorDoorGradeFactor = 1.55;
				break;

			default:
				alert('Invalid door grade selection')
		}

		if (newDoorOpening) {
			newDoorOpeningCost = newDoorOpeningCount * newDoorOpeningPrice * ((this.yearBuiltFactor + 1) / 2);
		}

		this.exteriorDoorFinalCost = (exteriorDoorCount * exteriorDoorPrice * this.exteriorDoorGradeFactor * ((this.yearBuiltFactor + 1) / 2)) + newDoorOpeningCost; // calculates cost of exterior door replacements, if applicable 

	}

	// ********************************************************************
	// ***** QUESTION # 13 to user - INTERIOR DOORS *****
	// ********************************************************************

	setInteriorDoorsAnswer(replaceInteriorDoors, interiorDoorCount, interiorDoorGrade, replaceInteriorLocksets, interiorLocksetGrade) {
		const interiorDoorPrice = 315.00; // base cost for replacement of 1 average interior door unit, (lockset not included). Price should not include painting of door unit (calculated later in painting).
		const interiorLocksetPrice = 45.00; // price to supply & install 1 average grade interior lockset
		this.replaceInteriorDoors = replaceInteriorDoors

		let approxInteriorDoorCount = this.roomSizeSF/100; // assumes approx 1 interior door unit per 144 sf of floor area for living rooms, used if user not sure, or if ONLY lock-sets are being replaced without new doors
		if (approxInteriorDoorCount > 8){
			approxInteriorDoorCount= 8; // assign max value of 8 approximate interior doors for living rooms
		}
		else if (approxInteriorDoorCount < 1){
			approxInteriorDoorCount= 1; // assign min value of 1 approximate interior door
		} 

		let interiorDoorGradeFactor=1.00; // grade of interior door to be mulitplied by count of door units
		let interiorLocksetGradeFactor=1.00; // grade of interior door locksets to be multiplied by count of door locksets

		let interiorLocksetCost=0; // total cost for supply & installation of new lock-sets depending on count, grade, and constant price

		if (replaceInteriorDoors) {

			if (interiorDoorCount === "not sure") {
				interiorDoorCount = approxInteriorDoorCount; // assign the approximated door count for living room if user is "not sure" about how many doors
			} else {
				interiorDoorCount = parseInt(interiorDoorCount);
			}

			switch (interiorDoorGrade) {
				case "Bronze":
					this.interiorDoorGradeFactor = 0.85;
					break;

				case "Silver":
					this.interiorDoorGradeFactor = 1.00; // neutral factor for average grade door units	
					break;

				case "Gold":
					this.interiorDoorGradeFactor = 1.40;
					break;

				case "Platinum":
					this.interiorDoorGradeFactor = 1.85;

				default:
					alert('Invalid interior door grade')
			}

			this.interiorLocksetCost = interiorDoorCount * interiorLocksetPrice * interiorDoorGradeFactor;
			this.interiorDoorFinalCost = (interiorDoorCount * interiorDoorPrice * interiorDoorGradeFactor * this.yearBuiltFactor) + interiorLocksetCost; // calculates cost of interior door replacements, if applicable 

			if (interiorDoorCount > 3) {
				this.interiorDoorFinalCost = this.interiorDoorFinalCost * 0.9; // 10% discount if 4 or more doors to install
			}

		} else {
			if (replaceInteriorLocksets) {
				switch (interiorLocksetGrade) {
					case "Bronze":
						this.interiorLocksetGradeFactor = 0.80;
						break;

					case "Silver":
						this.interiorLocksetGradeFactor = 1.00;
						break;

					case "Gold":
						this.interiorLocksetGradeFactor = 1.30;
						break;

					case "Platinum":
						this.interiorLocksetGradeFactor = 1.60;

					default:
						alert('Invalid lockset grade')
				}
			}
		}

		this.interiorLocksetCost = approxInteriorDoorCount * interiorLocksetPrice * interiorLocksetGradeFactor;
		this.interiorDoorFinalCost = this.interiorLocksetCost; // Assign interiorLocksetCost to interiorDoorFinalCost as is the only cost associated with interior doors, since "no" new interior doors to be installed as specified by user

	}

	// ********************************************************************
	// ***** QUESTION # 14 to user - CABINETS *****
	// ********************************************************************
	

	setCabinetsAnswers(kitchenCabinetsIncluded, kitchenCabinetInstallNew, kitchenCabinetReface, kitchenCabinetPaint, kitchenCabinetRefinish, kitchenContainsIsland, kitchenCabinetGrade) {
		const kitchenCabinetRemovePrice= 999.99; // Price to remove kitchen cabinets for average sized kitchen (disposal not included in price in case customer wants to re-sell them)
		const kitchenCabinetDisposePrice= 999.99; // Price to dispose of kitchen cabinets for average sized kitchen

		const kitchenCabinetInstallNewPrice= 999.99; // Price per Linear foot to supply & install new average grade kitchen cabinets. 8' ceilings: *Note 1 LF = uppers & base. 0.5 LF = only upper OR base for that 1 foot section
		const kitchenCabinetRefacePrice= 999.99; // Price per Linear foot to to REFACE kitchen cabinet doors, change hardware. 8' ceilings: *Note 1 LF = uppers & base. 0.5 LF = only upper OR base for that 1 foot section   
		const kitchenCabinetPaintPrice= 999.99;  // Price per Linear foot to to PAINT kitchen cabinet doors, change hardware. 8' ceilings: *Note 1 LF = uppers & base. 0.5 LF = only upper OR base for that 1 foot section
		const kitchenCabinetRefinishPrice= 999.99;  // Price per Linear foot to to RE-STAIN wood kitchen cabinet doors, change hardware. 8' ceilings: *Note 1 LF = uppers & base. 0.5 LF = only upper OR base for that 1 foot section

		this.kitchenIslandPeninsulaLF = 0;

		this.kitchenCabinetLF = (Math.sqrt(this.kitchenSizeSF) * 2) - this.pantryFootprint;
		if (this.kitchenCabinetLF > 40) {
			this.kitchenCabinetLF = 40; // assign max initial value of 40, can still be increased by island/peninsula LF
		}

		this.kitchenCabinetCeilingFactor = ((this.ceilingFactor + 1) / 2);
		if (this.kitchenCabinetCeilingFactor > 1.08) {
			this.kitchenCabinetCeilingFactor = 1.08; // assign max value of 1.08
		}

		let kitchenCabinetGradeFactor= 1.00; // Initialized to neutral

		if (kitchenCabinetsIncluded) {
			if (kitchenContainsIsland) {
				this.kitchenIslandPeninsulaLF = this.kitchenSizeSF * 0.032;
				if (this.kitchenIslandPeninsulaLF > 14) {
					this.kitchenIslandPeninsulaLF = 14; // max value of 14 Linear Feet
				}
				this.kitchenCabinetLF = this.kitchenCabinetLF + this.itchenIslandPeninsulaLF;
			}
		}

		if (kitchenCabinetInstallNew) {
			switch (kitchenCabinetGrade) {
				case "Bronze":
					this.kitchenCabinetGradeFactor = 0.85;
					break;

				case "Silver":
					this.kitchenCabinetGradeFactor = 1.00;
					break;

				case "Gold":
					this.kitchenCabinetGradeFactor = 1.15;
					break;

				case "Platinum":
					this.kitchenCabinetGradeFactor = 1.30;
					break;

				default:
					alert('Invalid kitchen cabinet grade')
			}

			this.cabinetsFinalCost = kitchenCabinetInstallNewPrice * this.kitchenCabinetLF * this.kitchenCabinetCeilingFactor * kitchenCabinetGradeFactor;
		}

		if (kitchenCabinetReface) {
			this.cabinetsFinalCost = kitchenCabinetRefacePrice * this.kitchenCabinetLF * this.kitchenCabinetCeilingFactor * ((this.yearBuiltFactor + 1) / 2);
		}

		if (kitchenCabinetPaint) {
			this.cabinetsFinalCost = kitchenCabinetPaintPrice * this.kitchenCabinetLF * this.kitchenCabinetCeilingFactor * ((this.yearBuiltFactor + 1) / 2);
		}

		if (kitchenCabinetRefinish) {
			this.cabinetsFinalCost = kitchenCabinetRefinishPrice * this.kitchenCabinetLF * this.kitchenCabinetCeilingFactor * ((this.yearBuiltFactor + 1) / 2);
		}
	}

	// ********************************************************************
	// ***** QUESTION # 15 to user - COUNTERTOPS *****
	// ********************************************************************

	setCounterTopsAnswer(installKitchenCountertops, kitchenCountertopType) {
		const graniteKitchenCounterPrice= 105.00; 
		const quartzKitchenCounterPrice= 96.00;
		const laminateKitchenCounterPrice= 56.00;
		const woodKitchenCounterPrice= 72.00;
		const solidSurfaceKitchenCounterPrice= 74.00;
		const tileKitchenCounterPrice= 60.00;
		const concreteKitchenCounterPrice= 84.00;
		const stainlessSteelKitchenCounterPrice= 134.00;
		const otherKitchenCounterPrice= 78.00;


		this.kitchenCountertopLF = ((Math.sqrt(this.kitchenSizeSF) * 2) + (this.kitchenIslandPeninsulaLF * 2.80) - this.pantryFootprint - 5); // 5LF represents fridge and stove not requiring countertops
		if (this.kitchenCountertopLF < 8) {
			this.kitchenCountertopLF = 8; // min length of 8'
		} else if (this.kitchenCountertopLF > 70) {
			this.kitchenCountertopLF = 70; // max length of 70'    
		}

		this.kitchenCountertopSF = this.kitchenCountertopLF * 2.13;

		if (installKitchenCountertops) {
			switch (kitchenCountertopType) {
				case "Granite":
					this.kitchenCountertopRate = graniteKitchenCounterPrice;
					break;

				case "Quartz":
					this.kitchenCountertopRate = quartzKitchenCounterPrice;
					break;

				case "Laminate":
					this.kitchenCountertopRate = laminateKitchenCounterPrice;
					break;

				case "Wood":
					this.kitchenCountertopRate = woodKitchenCounterPrice;
					break;

				case "Solid Surface":
					this.kitchenCountertopRate = solidSurfaceKitchenCounterPrice;
					break;

				case "Tile":
					this.kitchenCountertopRate = tileKitchenCounterPrice;
					break;

				case "Concrete":
					this.kitchenCountertopRate = concreteKitchenCounterPrice;
					break;

				case "Stainless Steel":
					this.kitchenCountertopRate = stainlessSteelKitchenCounterPrice;
					break;

				case "Other":
					this.kitchenCountertopRate = otherKitchenCounterPrice;
					break;
			}
			this.countertopFinalCost = this.kitchenCountertopRate * this.kitchenCountertopSF;
		}

	}

	// ********************************************************************
	// ***** QUESTION # 16 to user - BACKSPLASH *****
	// ********************************************************************
	setBackSplashAnswer(tileToCeiling, tileKitchenSplashGrade) {
		const tileKitchenSplashPrice= 30.00; // Price per square foot to supply & install standard grade tile

		this.tileKitchenSplashSF = this.kitchenSizeSF * 0.325; // includes 8% waste factor
		if (this.tileKitchenSplashSF > 80) {
			this.tileKitchenSplashSF = 80; // max value of 80 square feet
		} else if (this.tileKitchenSplashSF < 22) {
			this.tileKitchenSplashSF = 22; // min value of 22 square feet
		}

		if (tileToCeiling) {
			this.tileKitchenSplashSF = this.tileKitchenSplashSF * 1.27 * this.kitchenCabinetCeilingFactor;
		}

		switch (tileKitchenSplashGrade) {
			case "Bronze":
				this.tileKitchenSplashGradeFactor = 0.85;
				break;

			case "Silver":
				this.tileKitchenSplashGradeFactor = 1.00;
				break;

			case "Gold":
				this.tileKitchenSplashGradeFactor = 1.30;
				break;

			case "Platinum":
				this.tileKitchenSplashGradeFactor = 1.60;
				break;

			default:
				alert('Invalid tile kitchen splash grade')

		}
		this.backsplashFinalCost = tileKitchenSplashPrice * this.tileKitchenSplashGradeFactor * this.tileKitchenSplashSF;
	}

	// ********************************************************************
	// ***** QUESTION # 17 to user - SINK *****
	// ********************************************************************
	setSinkAnswer(installKitchenSinkQty, kitchenSinkGrade) {
		const installKitchenSinkPrice = 875.00; // Price to supply and install 1 average grade double bowl sink, including plumbing connections/labour & plumbing parts

		switch (kitchenSinkGrade) {
			case "Bronze":
				this.kitchenSinkGradeFactor = 0.80;
				break;

			case "Silver":
				this.kitchenSinkGradeFactor = 1.00;
				break;

			case "Gold":
				this.kitchenSinkGradeFactor = 1.55;
				break;

			case "Platinum":
				this.kitchenSinkGradeFactor = 2.10;
				break;

			default:
				alert('Invalid kitchen sink grade')

		}
		this.sinkFinalCost = installKitchenSinkPrice * this.kitchenSinkGradeFactor * installKitchenSinkQty * ((this.yearBuiltFactor + 1) / 2);
	}

	// ********************************************************************
	// ***** QUESTION # 18 to user - FAUCET *****
	// ********************************************************************
	setFaucetAnswer(installKitchenFaucetQty, kitchenFaucetGrade) {
		const installKitchenFaucetPrice= 540.00; // Price to supply and install 1 average grade kitchen faucet, including plumbing connections/labour & plumbing parts

		switch (kitchenFaucetGrade) {
			case "Bronze":
				this.kitchenFaucetGradeFactor = 0.65;
				break;

			case "Silver":
				this.kitchenFaucetGradeFactor = 1.00;
				break;

			case "Gold":
				this.kitchenFaucetGradeFactor = 1.50;
				break;

			case "Platinum":
				this.kitchenFaucetGradeFactor = 2.15;
				break;

			default:
				alert('Invalid kitchen faucet grade')

		}
		this.faucetFinalCost = installKitchenFaucetPrice * this.kitchenFaucetGradeFactor * installKitchenFaucetQty * ((this.yearBuiltFactor + 1) / 2);
	}

	// ********************************************************************
	// ***** QUESTION # 19 to user - DISHWASHER *****
	// ********************************************************************

	setDishwasherAnswer(installKitchenSinkQty, installKitchenFaucetQty, installDishwasherQty) {
		const installDishwasherPrice = 275.00; // Price to install 1 dishwasher in average/neutral conditions inlcuding supply of new shut-off & braided supply line/elbow

		if (installKitchenSinkQty < 1 || installKitchenFaucetQty < 1) {
			installDishwasherQty = 1
		}
		this.dishwasherFinalCost = installDishwasherPrice * installDishwasherQty * ((this.yearBuiltFactor + 1) / 2);
	}

	// ********************************************************************
	// ***** QUESTION # 20 to user - GARBURATOR *****
	// ********************************************************************

	setGarburatorAnswer(installKitchenSinkQty, installGarburatorQty) {
		const installGarburatorPrice = 195.00; // Price to install 1 garburator

		if (installKitchenSinkQty < 1) {
			installGarburatorQty = 1
		}
		this.garburatorFinalCost = installGarburatorPrice * installGarburatorQty * ((this.yearBuiltFactor + 1) / 2);
	}

	// ********************************************************************
	// ***** QUESTION # 21 to user - FRIDGE WATER LINE *****
	// ********************************************************************

	setFridgeWaterLineAnswer(FridgeWaterLine) {
		const installFridgeWaterLinePrice= 160.00; // Price to rough-in and connect a fridge to a water source

		if(FridgeWaterLine){
			this.fridgeLineFinalCost = installFridgeWaterLinePrice * this.plumbingLevelFactor * ((this.yearBuiltFactor + 1) / 2);
		} else {
			this.fridgeLineFinalCost = 0;
		}
	}

	// ********************************************************************
	// ***** QUESTION # 22 to user - RANGE HOOD *****
	// ********************************************************************

	setRangeHoodAnswer(rangeHoodType, rangeHoodVentedAnswer, exteriorVentPreExistingAnswer) {
		const installUnderCabinetHoodPrice = 999.99;
		const installUnderCabinetOtrMicrowavePrice = 999.99;
		const installWallChimneyHoodPrice = 999.99;
		const installFloatingIslandHoodPrice = 999.99;
		const installDownDraftHoodPrice = 999.99;
		const installOtherHoodPrice = 999.99; // Generic average price to install "Other" range hood selected by user

		const roughInExteriorHoodVentPrice = 999.99; // Price to rough-in new venting for range hood in neutral conditions
		const connectExteriorHoodVentPrice = 999.99; // Price to connect an average range hood appliance to an existing exterior vent

		this.rangeHoodCeilingFactor = ((this.ceilingFactor + 1) / 2);
		if (this.rangeHoodCeilingFactor > 1.25) {
			this.rangeHoodCeilingFactor = 1.25; // max value of 1.25
		}

		switch (rangeHoodType) {
			case "Under cabinet hood":
				this.installRangeHoodRate = installUnderCabinetHoodPrice;
				break;

			case "Under Cabinet OTR Microwave":
				this.installRangeHoodRate = installUnderCabinetOtrMicrowavePrice;
				break;

			case "Wall chimney hood":
				this.installRangeHoodRate = installWallChimneyHoodPrice;
				break;

			case "Floating island hood":
				this.installRangeHoodRate = installFloatingIslandHoodPrice;
				break;

			case "Down draft hood":
				this.installRangeHoodRate = installDownDraftHoodPrice;
				break;

			case "Other":
				this.installRangeHoodRate = installOtherHoodPrice;
				break;

			default:
				alert('Invalid range hood type')

		}

		if (rangeHoodVentedAnswer === "Yes, exhausted to exterior") {

			if (exteriorVentPreExistingAnswer === "Yes") {
				this.rangeHoodFinalCost = this.installRangeHoodRate + (connectExteriorHoodVentPrice * ((this.yearBuiltFactor + 1) / 2));
			} else if (exteriorVentPreExistingAnswer === "No") {
				if (rangeHoodType === "Floating island hood" || rangeHoodType === "Down draft hood") {
					this.rangeHoodFinalCost = this.installRangeHoodRate + (roughInExteriorHoodVentPrice * this.yearBuiltFactor * 1.75) + (connectExteriorHoodVentPrice * ((this.yearBuiltFactor + 1) / 2)); // Add 75% to cost of exhaust rough-in for those 2 types of hoods 
				} else {
					this.rangeHoodFinalCost = this.installRangeHoodRate + (roughInExteriorHoodVentPrice * this.yearBuiltFactor) + (connectExteriorHoodVentPrice * ((this.yearBuiltFactor + 1) / 2));
				}
			} else if (exteriorVentPreExistingAnswer === "Not sure") {
				if (rangeHoodType === "Floating island hood" || rangeHoodType === "Down draft hood") {
					this.rangeHoodFinalCost = this.installRangeHoodRate + (roughInExteriorHoodVentPrice * this.yearBuiltFactor) + (connectExteriorHoodVentPrice * ((this.yearBuiltFactor + 1) / 2)); // Do not Add 75% to cost of exhaust rough-in for those 2 types of hoods if "Not Sure" 
				} else {
					this.rangeHoodFinalCost = this.installRangeHoodRate + (roughInExteriorHoodVentPrice * 0.4 * this.yearBuiltFactor) + (connectExteriorHoodVentPrice * ((this.yearBuiltFactor + 1) / 2)); // Charge 40% of rough-in price if "Not sure"
				}

			}
		} else if (rangeHoodVentedAnswer === "No, exhausted to interior using filter is fine") {
			this.rangeHoodFinalCost = this.installRangeHoodRate;
		}

		if (rangeHoodType === "Wall chimney hood" || rangeHoodType === "Floating island hood") {
			this.rangeHoodFinalCost = this.rangeHoodFinalCost * this.rangeHoodCeilingFactor;
		}
	}

	// ********************************************************************
	// ***** QUESTION # 23 to user - COOKTOP *****
	// ********************************************************************

	setCooktopAnswer(installCookTop) {
		this.installCookTop = installCookTop
		const installCookTopPrice = 999.99;
		if (installCookTop) {
			this.cookTopFinalCost = installCookTopPrice;
		} else {
			this.cookTopFinalCost = 0;
		}
	}


	// ********************************************************************
	// ***** QUESTION # 24 to user - WALL OVEN *****
	// ********************************************************************  
	setWallOvenAnswer(installWallOven){
		const installWallOvenPrice= 999.99; // Price to mount, connect, and install an average wall oven
		if (installWallOven){
			this.wallOvenFinalCost = installWallOvenPrice;
		  } else {
			  this.wallOvenFinalCost = 0;
		  }
	}

	// ********************************************************************
	// ***** QUESTION # 25 to user - GAS LINE(S) *****
	// ********************************************************************  
	setGasLineAnswer(installWallOven, anyKitchenApplianceGas, anyGasLineRoughInRequired) {
		let kitchenGasPermitPrice = 999.99; // Price for gas permit & inspection. Only 1 required no matter number of appliances
		let kitchenGasLineRoughInPrice = 999.99; // Price to rough-in a new gas line in neutral/average conditions
		let kitchenConnectGasAppliancePrice = 999.99; // Price to connect 1 kitchen appliance to an existing gas line

		if (this.installCookTop) {
			kitchenConnectGasAppliancePrice = kitchenConnectGasAppliancePrice + (kitchenConnectGasAppliancePrice * 0.5)
		}
		if (installWallOven) {
			kitchenConnectGasAppliancePrice = kitchenConnectGasAppliancePrice + (kitchenConnectGasAppliancePrice * 0.5)
		}

		if (anyKitchenApplianceGas) {
			if (anyGasLineRoughInRequired === "Yes") {
				this.gasLineConnectionFinalCost = kitchenGasPermitPrice + (kitchenGasLineRoughInPrice * yearBuiltFactor) + kitchenConnectGasAppliancePrice;
			} else if (anyGasLineRoughInRequired === "No, all required gas lines are in place") {
				this.gasLineConnectionFinalCost = kitchenGasPermitPrice + kitchenConnectGasAppliancePrice;
			}
		}
	}

	// ********************************************************************
	// ***** QUESTION # 26 to user - CEILING REFINISHING *****
	// ********************************************************************
	setCeilingRefinishingAnswer(includeDiningCeiling, ceilingType, panelGrade, cofferedGrade, skyCount, installSky, skyType) {
		const ceilingDrywallTexturedPrice = 6.50; // Price per Square Foot to scrape, repair, paint, and install new span textured ceilings in average room conditions in average age home
		const ceilingDrywallSmoothPrice = 7.25; // Price per Square Foot to scrape, repair, paint, and install new span textured ceilings in average room conditions in average age home
		const ceilingSuspendedPrice = 7.00; // Price per square foot to install average grade 2x2 suspended ceiling
		const ceilingCofferedPrice = 17.00; // Price per square foot to install average grade coffered / architectural ceilings in average room conditions in average age home & ceiling height
		const ceilingOtherPrice = 8.00;

		const newSkylightPrice = 2800.00; // Price to install 1 new skylight in average conditions
		const replaceSkylightPrice = 1600.00; // Price to replace or repair 1 average skylight in average conditions

		let ceilingRate = 0; // Factor per Square foot to install selected ceiling type. Assigned price value of type selected
		let skyRate = 0; // Factor assigned by type of skylight installation chosen by user. Multiplied by skyCount to get skyCost;
		let skyCost = 0;

			if (ceilingType === "drywall textured") {
				ceilingRate = ceilingDrywallTexturedPrice;
			}

			if (ceilingType === "drywall smooth") {
				ceilingRate = ceilingDrywallSmoothPrice;
			}

			if (ceilingType === "suspended panels") {
				switch (panelGrade) {
					case "Bronze":
						ceilingRate = ceilingSuspendedPrice * 0.82;
						break;

					case "Silver":
						ceilingRate = ceilingSuspendedPrice;
						break;

					case "Gold":
						ceilingRate = ceilingSuspendedPrice * 1.25;
						break;

					case "Platinum":
						ceilingRate = ceilingSuspendedPrice * 1.55;
						break;

					default:
						alert('Invalid panel grade')
				}
			}

			if (ceilingType === "coffered/architectural") {
				switch (cofferedGrade) {
					case "Bronze":
						ceilingRate = ceilingCofferedPrice * 0.85;
						break;

					case "Silver":
						ceilingRate = ceilingCofferedPrice;
						break;

					case "Gold":
						ceilingRate = ceilingCofferedPrice * 1.30;
						break;

					case "Platinum":
						ceilingRate = ceilingCofferedPrice * 1.60;
						break;

					default:
						alert('Invalid coffered grade')

				}

			}
			if (ceilingType === "other") {
				ceilingRate = ceilingOtherPrice;
			}

			if (this.floorLevelName === "upper level" || this.floorLevelName === "main level") {
				if (installSky) {
					switch (skyType) {
						case "Install new skylight(s)":
							skyRate = newSkylightPrice;
							break;

						case "Replace or Repair existing skylight(s)":
							skyRate = replaceSkylightPrice;
							break;

						default:
							alert('Invalid sky type')
					}
					this.skyCost = skyRate * skyCount;
				}

			}

			if (includeDiningCeiling) {
				this.ceilingFinalCost = ((ceilingRate * this.roomSizeSF * 1.07) + skyCost) * this.ceilingFactor * ((this.yearBuiltFactor + 1) / 2); // Includes 1.07% waste factor on new ceiling. Uses roomSizeSF becasue dining ceiling included 
			} else {
				this.ceilingFinalCost = ((ceilingRate * this.kitchenSizeSF * 1.07) + skyCost) * this.ceilingFactor * ((this.yearBuiltFactor + 1) / 2); // Includes 1.07% waste factor on new ceiling. Uses kitchenSizeSF because dining ceiling NOT included     
			}
		
	}

	// ********************************************************************
	// ***** QUESTION # 27 to user - FLOORING *****
	// ********************************************************************
	setFlooringAnswer(replaceFlooring, newFloorType, newFloorGrade, existingFloorType, installSubfloor) {
		this.replaceFlooring = replaceFlooring
		if(this.additionalWalkInPantrySpaceSF === 'undefined'){
			this.additionalWalkInPantrySpaceSF = 0;
		}
		// Price PER SQUARE FOOT to supply & install, including required substrates and underlay/under-pad - average grade 
		const newLinoFloorPrice = 4.50;
		const newHardwoodFloorPrice = 12.50;
		const refinishHardwoodFloorPrice = 8.75; // Price per Square Foot to sand/strip existing hardwood floors and refinish them
		const newLaminateFloorPrice = 8.00;
		const newLvpFloorPrice = 7.25;
		const newEngHwFloorPrice = 9.25;
		const newCorkFloorPrice = 8.00;
		const newCeramicTileFloorPrice = 15.50;
		const newLvtFloorPrice = 9.75;
		const newNaturalStoneFloorPrice = 19.25;
		const newOtherFloorPrice = 8.25; // Used for "Other" & "Not Sure" selections by user, Price per Square Foot to supply & install, including required sub-strates and underlay/underpad - average grade

		const newInsulatedSubPrice = 4.25; // Price per Square Foot to supply & install new dricore insulated sub-floor - average/good conditions

		// Prices to remove specific type of existing flooring in average conditions, includes disposal to landfill. Includes pulling nails, staples, scraping glue, etc.:
		const removeCarpetFloorPrice = 0.80;
		const removeLinoFloorPrice = 0.50;
		const removeHardwoodFloorPrice = 1.50;
		const removeLaminateFloorPrice = 0.65;
		const removeLvpFloorPrice = 0.65;
		const removeEngHwFloorPrice = 0.65;
		const removeCorkFloorPrice = 0.65;
		const removeCeramicTileFloorPrice = 1.75;
		const removeLvtFloorPrice = 0.85;
		const removeNaturalStoneFloorPrice = 1.75;
		const removeOtherFloorPrice = 0.75; // Price used for selections of "Other" & "Not Sure" by user


		let newFloorRate = 0; // Price to install new flooring, per square foot, based on type selected by user
		let removeFloorRate = 0; // Current Price to remove existing floor coverings (if required) including disposal & prep existing substrates, per square foot, if any
		let insulatedSubfloorRate = 0; // Current Price to install wood insulated subfloor (i.e. dri-core) per square foot, if "yes" selected by user, if any

		let newFloorGradeFactor = 1.00; // multiplying factor for new floor rate based on GRADE of new flooring to be installed, chosen by user. Must be set to neutral 1.00 until changed by user

		let newFlooringQuantitySF = (this.kitchenSizeSF * 0.95) + (this.diningSizeSF * 1.07) + (this.additionalWalkInPantrySpaceSF * 1.07); // 7% waste factor not added to kitchen to compensate for cabinet footprint. 0.95 represents taking additional 5% off for cabinets 

		if (replaceFlooring) {
			switch (newFloorType) {
				case "Linoleum":
					this.newFloorRate = newLinoFloorPrice;
					break;

				case "Hardwood - Install New":
					this.newFloorRate = newHardwoodFloorPrice;
					break;

				case "Hardwood - Refinish Existing":
					this.newFloorRate = refinishHardwoodFloorPrice;
					break;

				case "Laminate":
					this.newFloorRate = newLaminateFloorPrice;
					break;

				case "Luxury Vinyl Plank":
					this.newFloorRate = newLvpFloorPrice;
					break;

				case "Engineered Hardwood":
					this.newFloorRate = newEngHwFloorPrice;
					break;

				case "Cork":
					this.newFloorRate = newCorkFloorPrice;
					break;

				case "Ceramic Tile":
					this.newFloorRate = newCeramicTileFloorPrice;
					break;

				case "Luxury Vinyl Tile":
					this.newFloorRate = newLvtFloorPrice;
					break;

				case "Natural Stone":
					this.newFloorRate = newNaturalStoneFloorPrice;
					break;

				case "Other":
					this.newFloorRate = newOtherFloorPrice;
					break;

				case "Not Sure":
					this.newFloorRate = newOtherFloorPrice;
					break;

				default:
					alert('Invalid floor type')

			}

			if (newFloorType !== "Hardwood - Refinish Existing") {
				switch (newFloorGrade) {
					case "Bronze":
						this.newFloorGradeFactor = 0.78;
						break;

					case "Silver":
						this.newFloorGradeFactor = 1.00;
						break;

					case "Gold":
						this.newFloorGradeFactor = 1.16;
						break;

					case "Platinum":
						this.newFloorGradeFactor = 1.32
						break;

					default:
						alert('Invalid floor grade')
				}
			}

			switch (existingFloorType) {
				case "N/A - there is no existing flooring to remove":
					this.removeFloorRate = removeCarpetFloorPrice;
					break;

				case "Carpet":
					this.removeFloorRate = removeCarpetFloorPrice;
					break;

				case "Linoleum":
					this.removeFloorRate = removeLinoFloorPrice;
					break;

				case "Hardwood":
					this.removeFloorRate = removeHardwoodFloorPrice;
					break;

				case "Laminate":
					this.removeFloorRate = removeLaminateFloorPrice;
					break;

				case "Luxury Vinyl Plank":
					this.removeFloorRate = removeLvpFloorPrice;
					break;

				case "Engineered Hardwood":
					this.removeFloorRate = removeEngHwFloorPrice;
					break;

				case "Cork":
					this.removeFloorRate = removeCorkFloorPrice;
					break;

				case "Ceramic Tile":
					this.removeFloorRate = removeCeramicTileFloorPrice;
					break;

				case "Luxury Vinyl Tile":
					this.removeFloorRate = removeLvtFloorPrice;
					break;

				case "Natural Stone":
					this.removeFloorRate = removeNaturalStoneFloorPrice;
					break;

				case "Other":
					this.removeFloorRate = removeOtherFloorPrice;
					break;

				default:
					alert('Invalid floor type')
			}

		}

		if (this.floorLevelName === "basement level" || this.floorLevelName === "lower level") {
			if (installSubfloor) {
				insulatedSubfloorRate = newInsulatedSubPrice;
			}
		}
		this.flooringFinalCost = (this.newFloorRate * newFlooringQuantitySF * this.newFloorGradeFactor) + (this.removeFloorRate * newFlooringQuantitySF) + (insulatedSubfloorRate * newFlooringQuantitySF * this.yearBuiltFactor); // calculates cost of flooring, including insulated wood sub-flooring, if applicable  
	}

	// ********************************************************************
	// ***** QUESTION # 28 to user - MOULDINGS & MILLWORK *****
	// ********************************************************************
	setMouldingMillworkAnswer(installBaseboards, installWindowCasings, installDoorCasings, installWainscotting, installCrown, mouldingGrade) {
		this.installBaseboards = installBaseboards
		this.installWindowCasings = installWindowCasings
		this.installDoorCasings = installDoorCasings
		this.installWainscotting = installWainscotting
		this.installCrown = installCrown

		const baseboardPrice = 5.25; // price to supply & install average grade baseboards per linear foot, in average conditions, includes removal & disposal of existing
		const windowCasingPrice = 4.75; // price to supply & install average grade window casings per linear foot, in average conditions, includes removal & disposal of existing
		const doorCasingPrice = 4.50; // price to supply & install average grade door casings per linear foot, in average conditions, includes removal & disposal of existing
		const wainscottingPrice = 55.00; // price to supply & install average grade wainscotting per linear foot, in average conditions
		const crownPrice = 10.00; // price to supply & install average grade crown moulding per linear foot in average conditions

		let baseboardLF = Math.sqrt(this.roomSizeSF + this.additionalWalkInPantrySpaceSF) * 1.50; // approximates linear footage of baseboards based off square footage of room
		let windowCasingLF = this.roomSizeSF * 0.18; // approximates linear footage of window casings based off square footage of room
		let doorCasingLF = ((this.roomSizeSF + this.additionalWalkInPantrySpaceSF) / 120) * 36; // approximates linear footage of door casings based off square footage of room 
		let wainscottingLF = Math.sqrt(this.roomSizeSF) * 1.10; // approximates linear footage of wainscotting based off square footage of room
		let crownLF = Math.sqrt(this.roomSizeSF) * 3 * 1.10; // approximates linear footage of crown moulding based off square footage of room + 10% waste factor

		let mouldingGradeFactor = 1.00;
		let baseboardCost = 0;
		let windowCasingCost = 0;
		let doorCasingCost = 0;
		let wainscottingCost = 0;
		let crownCost = 0;

		switch (mouldingGrade) {
			case "Bronze":
				mouldingGradeFactor = 0.75
				break;

			case "Silver":
				mouldingGradeFactor = 1.00
				break;

			case "Gold":
				mouldingGradeFactor = 1.40
				break;

			case "Platinum":
				mouldingGradeFactor = 1.75
				break;

			default:
				alert('Invalid moulding grade')
		}

		if (installBaseboards) {
			baseboardCost = baseboardPrice * baseboardLF * mouldingGradeFactor;
		}

		if (installWindowCasings) {
			windowCasingCost = windowCasingPrice * windowCasingLF * mouldingGradeFactor * ((this.ceilingFactor + 1) / 2);
		}

		if (installDoorCasings) {
			doorCasingCost = doorCasingPrice * doorCasingLF * mouldingGradeFactor;
		}

		if (installWainscotting) {
			wainscottingCost = wainscottingPrice * wainscottingLF * mouldingGradeFactor;
		}

		if (installCrown) {
			crownCost = crownPrice * crownLF * mouldingGradeFactor * this.ceilingFactor;
		}

		this.mouldingsFinalCost = baseboardCost + windowCasingCost + doorCasingCost + wainscottingCost + crownCost; // calculates cost of all mouldings & millwork, if applicable 
	}

	// ********************************************************************
	// ***** QUESTION # 29 to user - RAILING SECTIONS *****
	// ********************************************************************
	setRailingSectionsAnswer(kitchenRailingType, kitchenRailingGrade, kitchenRailingRelativeQty) {
		const installKitchenRailingBronzePrice = 99.99; // Price per linear foot to remove existing, dispose, supply & install bronze grade guard railings
		const installKitchenRailingSilverPrice = 99.99; // Price per linear foot to remove existing, dispose, supply & install silver grade guard railings
		const installKitchenRailingGoldPrice = 99.99; // Price per linear foot to remove existing, dispose, supply & install gold grade guard railings
		const installKitchenRailingPlatinumPrice = 99.99; // Price per linear foot to remove existing, dispose, supply & install platinum grade guard railings

		const paintKitchenRailingPrice = 99.99; // Price per linear foot to paint railings
		const refinishKitchenRailingPrice = 99.99; // Price per linear foot to sand & stain railings
		const covertKitchenRailingToWallPrice = 99.99; // price per linear foot to remove a railing section, frame, board, tape, and cap with MDF 
		const removeKitchenRailingPrice = 99.99; // Price per linear foot to remove a railing section, repair wall & floor as required. *For smaller step heights that do not require railings

		let kitchenRailingRate = 0; // Holds current price for railings based on type selected by user

		if (kitchenRailingType === "Install new guard railing(s)") {
			if (kitchenRailingGrade === "Bronze") {
				kitchenRailingRate = installKitchenRailingBronzePrice;
			} else if (kitchenRailingGrade === "Silver") {
				kitchenRailingRate = installKitchenRailingSilverPrice;
			} else if (kitchenRailingGrade === "Gold") {
				kitchenRailingRate = installKitchenRailingGoldPrice;
			} else if (kitchenRailingGrade === "Platinum") {
				kitchenRailingRate = installKitchenRailingPlatinumPrice;
			}
		}

		if (kitchenRailingType === "Paint guard railings") {
			kitchenRailingRate = paintKitchenRailingPrice;
		}

		if (kitchenRailingType === "Refinish guard railings") {
			kitchenRailingRate = refinishKitchenRailingPrice;
		}

		if (kitchenRailingType === "Convert guard railings to a solid wall") {
			kitchenRailingRate = covertKitchenRailingToWallPrice;
		}

		if (kitchenRailingType === "Permanently remove guard railings") {
			kitchenRailingRate = removeKitchenRailingPrice;
		}

		switch (kitchenRailingRelativeQty) {
			case "Minimal":
				this.kitchenRailingQtyFactor = 4 * this.kitchenSizeFactor;
				break;

			case "Small":
				this.kitchenRailingQtyFactor = 5 * this.kitchenSizeFactor;
				break;

			case "Average":
				this.kitchenRailingQtyFactor = 9 * this.kitchenSizeFactor;
				break;

			case "Large":
				this.kitchenRailingQtyFactor = 13 * this.kitchenSizeFactor;
				break;

			case "Extra Large":
				this.kitchenRailingQtyFactor = 18 * this.kitchenSizeFactor;
				break;

			default:
				alert('Invalid kitchen railing relative qty')
		}

		this.railingsFinalCost = kitchenRailingRate * this.kitchenRailingQtyFactor * ((this.yearBuiltFactor + 1) / 2);
	}

	// ********************************************************************
	// ***** QUESTION # 30 to user - LIGHTING *****
	// ********************************************************************
	setLightingAnswer(kitchenLightFixture, kitchenPotLight, hangingPendantLight, diningChandelier, ceilingFan, underCabinetLight, newLighting, lightingGrade) {
		const kitchenLightFixturePrice = 140.00; // Price to supply & install 1 average grade standard light fixture in average/neutral conditions
		const kitchenPotLightPrice = 840.00; // Price to install 1 application (4 POTS) of kitchen pot lighting, with neutral conditions for average sized kitchen
		const hangingPendantLightPrice = 260.00; // Price to supply & install 1 average grade hanging pendant light fixture
		const diningChandelierPrice = 580; // Price to supply & install 1 average grade dining chadelier for average sized room
		const ceilingFanPrice = 360.00; // Price to supply & install an average ceiling fan with neutral conditions (i.e. 8' ceiling, non-vaulted, etc)
		const underCabinetLightPrice = 1400.00; // Price to rough-in, supply & install average grade under-cabinet lighting for average sized kitchen
		const newLightingPrice = 280.00; // Price to rough-in average quantity of new light fixtures/circuits per average sized kitchen/dining

		let lightingGradeFactor = 1.00;

		let newLightingCost = 0;
		let kitchenLightFixtureCost = 0;
		let kitchenPotLightCost = 0;
		let hangingPendantLightCost = 0;
		let diningChandelierCost = 0;
		let ceilingFanCost = 0;
		let underCabinetLightCost = 0;

		let approxUpdateLightsQty = this.roomSizeSF / 60; // approximates number of light fixtures required for living room if user "not sure" about quantity of new light fixtures required
		if (approxUpdateLightsQty > 6) {
			approxUpdateLightsQty = 6; // max value of 6 for approxUpdateLightsQty
		}

		let newLightingQty = this.roomSizeSF / 140;
		if (newLightingQty > 2) {
			newLightingQty = 2; // max value of 2 
		}

		switch (lightingGrade) {
			case "Bronze":
				this.lightingGradeFactor = 0.75 // 22% less than average grade lighting
				break;

			case "Silver":
				this.lightingGradeFactor = 1.00 // neutral factor for average grade lighting
				break;

			case "Gold":
				this.lightingGradeFactor = 1.50 // 50% increase for upgraded lighting
				break;

			case "Platinum":
				this.lightingGradeFactor = 1.85 // 85% increase for high end lighting
				break;

			default:
				alert('Invalid lighting grade')
		}

		if (newLighting) {
			newLightingCost = newLightingQty * newLightingPrice * this.yearBuiltFactor * this.ceilingFactor;
		}


		// Assign value of kitchenLightFixtureCost:  
		if (kitchenLightFixture) {
			if (kitchenPotLight == false) {
				kitchenLightFixtureCost = kitchenLightFixturePrice * lightingGradeFactor * approxUpdateLightsQty * ((this.ceilingFactor + 1) / 2);
			} else if (kitchenPotLight) {
				kitchenLightFixtureCost = kitchenLightFixturePrice * lightingGradeFactor * (approxUpdateLightsQty * 0.6) * ((this.ceilingFactor + 1) / 2); // assume only 60% of lighting will be required with pot lights also being true
			}
		}

		// Assign value of kitchenPotLightCost:
		if (kitchenPotLight) {
			if (kitchenLightFixture !== "yes") {
				kitchenPotLightCost = kitchenPotLightPrice * ((((lightingGradeFactor + 1) / 2) + 1) / 2) * approxUpdateLightsQty * this.kitchenSizeFactor * ((this.ceilingFactor + 1) / 2);
			} else if (!kitchenLightFixture) {
				kitchenPotLightCost = kitchenPotLightPrice * ((((lightingGradeFactor + 1) / 2) + 1) / 2) * (approxUpdateLightsQty * 0.70) * this.kitchenSizeFactor * ((this.ceilingFactor + 1) / 2); // assume only 70% of pot lighting will be required with light fixtures also being true. Only 25% of lighting grade factor applied to pot lights
			}
		}

		// Assign value of hangingPendantLightCost:  
		if (hangingPendantLight) {
			hangingPendantLightCost = hangingPendantLightPrice * lightingGradeFactor * 2.5 * this.kitchenSizeFactor * ((this.ceilingFactor + 1) / 2); // assumes quantity of 2.5 fixtures in average sized kitchen. Increased or decreased using kitchenSizeFactor.
		}

		// Assign value of diningChandelierCost:  
		if (diningChandelier) {
			diningChandelierCost = diningChandelierPrice * lightingGradeFactor * ((this.kitchenSizeFactor + 1) / 2) * ((this.ceilingFactor + 1) / 2); // Assumes only 1 chandelier, but uses 50% of kitchen size factor to help better compensate for size/grade of chandelier
			if (kitchenLightFixtureCost > 0) {
				kitchenLightFixtureCost = kitchenLightFixtureCost - (kitchenLightFixturePrice * lightingGradeFactor * ((this.ceilingFactor + 1) / 2)); // Give user credit for cost of 1 fixture as being replaced by chandelier
			}
		}

		// Assign value of ceilingFanCost: 
		if (ceilingFan) {
			ceilingFanCost = ceilingFanPrice * lightingGradeFactor * ((this.ceilingFactor + 1) / 2);
		}

		// Assign value of underCabinetLightCost:   
		if (underCabinetLight) {
			underCabinetLightCost = underCabinetLightPrice * ((((lightingGradeFactor + 1) / 2) + 1) / 2) * this.kitchenSizeFactor;
		}

		// Assign lightingFinalCost:  
		this.lightingFinalCost = kitchenLightFixtureCost + kitchenPotLightCost + hangingPendantLightCost + diningChandelierCost + ceilingFanCost + underCabinetLightCost + newLightingCost;
	}

	// ********************************************************************
	// ***** QUESTION # 31 to user - ELECTRICAL UPDATES *****
	// ********************************************************************

	setEletricalUpdateAnswer(electricalUpdateCount) {
		const electricalUpdatePrice = 19.50; // price per unit to supply and install new outlet or switch (averages in cost of 1 dimmer switch per ~ 8 units)

		electricalUpdateCount = (this.roomSizeSF / 100) * 6.5;
		if (electricalUpdateCount > 18) {
			electricalUpdateCount = 18; // max count of 18 for Kitchen/Dining
		} else if (electricalUpdateCount < 6) {
			electricalUpdateCount = 6; // min value of 6
		}

		this.electricalFinalCost = electricalUpdateCount * electricalUpdatePrice * ((this.yearBuiltFactor + 1) / 2);
	}

	// ********************************************************************
	// ***** QUESTION # 32 to user - PAINTING *****
	// ********************************************************************
	setPaintingAnswer(repaintInteriorDoors, repaintInteriorDoorQty) {
		const paintingKitchenBasePrice = 2.90; // Starting base Price (PER SQUARE FOOT OF FLOOR AREA) to re-paint a neutral KITCHEN with neutral 8' ceilings (not including price of all other factors to be assigned to paintingAdditions)
		const paintBaseboardsPrice = 0.35; // Price per SF of room area to add painting of baseboards in room
		const paintCasingsPrice = 0.35; // Price per SF of room area to add painting of door and/or window casings in room
		const paintWainscottingPrice = 1.00; // Price per SF of room area to add painting of wainscotting in room
		const paintCrownPrice = 0.65; // Price per SF of room area to add painting of crown moulding in room
		const paintInteriorDoorUnitPrice = 85.00; // Price to paint each interior door unit (slab & jambs), Per Unit Price

		this.paintingAdditionsPrice = 0; // will be added to when/if certain items are true below. Then gets added to paintingBasePrice for a final per SF rate to paint this room
		this.paintInteriorDoorUnitsCost = 0; // total cost based on number of interior door units that need to be painted multiplied by the price to paint each door unit. Added to cost of painting room per SF.

		if (this.replaceFlooring || this.installBaseboards) {
			this.paintingAdditionsPrice += paintBaseboardsPrice;
		}

		if (this.installWindowCasings || this.installDoorCasings) {
			this.paintingAdditionsPrice += paintCasingsPrice;
		}

		if (this.installWainscotting) {
			this.paintingAdditionsPrice += paintWainscottingPrice;
		}

		if (this.installCrown) {
			this.paintingAdditionsPrice += paintCrownPrice;
		}

		// Assign cost to paintInteriorDoosUnitCost:
		if (this.replaceInteriorDoors) {
			this.paintInteriorDoorUnitsCost = interiorDoorCount * paintInteriorDoorUnitPrice;
		} else {
			if (repaintInteriorDoors) {
				if (repaintInteriorDoorQty === "not sure") {
					repaintInteriorDoorQty = approxInteriorDoorCount;
				} else {
					this.repaintInteriorDoorQty = parseInt(repaintInteriorDoorQty); // assign number entered by user
				}

				this.paintInteriorDoorUnitsCost = repaintInteriorDoorQty * paintInteriorDoorUnitPrice * this.yearBuiltFactor;
			}
		}
		this.paintingFinalCost = ((paintingKitchenBasePrice + this.paintingAdditionsPrice) * ((this.yearBuiltFactor + 1) / 2) * (this.roomSizeSF + this.additionalWalkInPantrySpaceSF) * this.ceilingFactor) + this.paintInteriorDoorUnitsCost; // calculates cost of painting, if applicable -- note cost to paint ceiling should be included in re-finish ceilings section, NOT here!  
	}


	// ********************************************************************
	// ***** QUESTION # 33 to user  - DESIGN HELP *****
	// ********************************************************************
	setDesignerHelpAnswer(designHelp) {
		const designHelpBaseFeePrice = 315.00 // base fee added to designHelpPrice, this fee should only be inlcuded ONCE if design help is requested for multiple room calculations
		let designHelpCalculatedFee = 0; // will remain at $0.00 if user selects "No"

		if (designHelp === "Maybe") {
			designHelpCalculatedFee = this.roomSum * 0.02; // 2% of total cost
		}

		if (designHelp === "Yes") {
			designHelpCalculatedFee = this.roomSum * 0.04; // 4% of total cost
		}

		if (designHelp === "Maybe" || designHelp === "Yes") {
			if (designHelpCalculatedFee > 2200) {
				designHelpCalculatedFee = 2200; // assign max value of $2,200 for Kitchens
			}
		}
		this.designerFinalCost = designHelpCalculatedFee + designHelpBaseFeePrice;
	}


	// ********************************************************************
	// ***** END OF QUESTIONS *****
	// ********************************************************************

	getRenovationSubTotal() {
	this.RenovationSubTotal = 0;
	let sections = [
				"wallRemovalFinalCost",
				"changeKitchenLayoutFinalCost",
				"constructNewPantryFinalCost",
				"windowFinalCost",
				"exteriorDoorFinalCost",
				"interiorDoorFinalCost",
				"cabinetsFinalCost",
				"countertopFinalCost",
				"backsplashFinalCost",
				"sinkFinalCost",
				"faucetFinalCost",
				"dishwasherFinalCost",
				"garburatorFinalCost",
				"fridgeLineFinalCost",
				"rangeHoodFinalCost",
				"cookTopFinalCost",
				"wallOvenFinalCost",
				"gasLineConnectionFinalCost",
				"ceilingFinalCost",
				"flooringFinalCost",
				"mouldingsFinalCost",
				"railingsFinalCost",
				"lightingFinalCost",
				"electricalFinalCost",
				"paintingFinalCost"]

		for(let section in sections){
			if(typeof(eval('this.' + sections[section])) !== "undefined" && Number.isNaN(eval('this.' + sections[section])) !== true){

				this.RenovationSubTotal += eval('this.' + sections[section])
			}
		}	
		return this.RenovationSubTotal	
		
	}

}

// module.exports = KitchenRenovationCalculator








// ********************************************************************
// ***** HELPER FUNCTIONS *****
// ********************************************************************  

// 	calculeRoomWallFactor() {
// 		if (this.kitchenSizeIsSet) {
// 			this.roomWallFactor = ((this.kitchenSizeSF - 144) * 0.00125) + 1;
// 			if (this.roomWallFactor > 1.50) {
// 				this.roomWallFactor = 1.50; // assign max value of 1.50 to roomWallFactor for kitchens
// 			}

// 			// ASSIGN VALUE OF kitchenSizeFactor:
// 			this.kitchenSizeFactor = (this.kitchenSizeSF / 180) + 0.222;
// 			if (this.kitchenSizeFactor > 1.50) {
// 				this.kitchenSizeFactor = 1.50; // Assign max value of 1.50
// 			} else if (this.kitchenSizeFactor < 0.85) {
// 				this.kitchenSizeFactor = 0.85; // Assign min value of 0.85
// 			}
// 		}
// 		if (this.includeDining) {
// 			this.roomSizeSF = this.kitchenSizeSF + this.diningSizeSF;
// 		} else {
// 			this.roomSizeSF = this.kitchenSizeSF;
// 		}
// 		return this.roomSizeSF;
// 	}


// }
