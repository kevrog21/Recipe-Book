import { useParams, Link } from 'react-router-dom' 
import { useState, useEffect } from 'react'
import Fraction from 'fraction.js'
import arrow from '../assets/arrow.svg'
import greyStar from '../assets/grey-star.svg'
import timerIcon from '../assets/timer-icon.svg'
import thickTimer from '../assets/thick-timer.svg'
import thumbIcon from '../assets/thumb-icon.svg'
import bell from '../assets/bell.svg'
import greyBell from '../assets/grey-bell.svg'
import filledBell from '../assets/bell-filled.svg'
import filledYellowStar from '../assets/star-filled.svg'
import checkmark from '../assets/checkmark.svg'
import { checkForVulgarFraction, decimalToFraction } from './utilityFunctions.js'
import closeIcon from '../assets/close-x.svg'
// import filledYellowStar from '../assets/filled-star-outline.svg'


export default function RecipePage(props) {
    const {slug} = useParams()
    const { mongoData, handleMongoFavoriteToggle, handleMongoRequestToggle, addNewCookedDate, prevPathHome } = props
    const [currentRecipe, setCurrentRecipe] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)
    const [ingredients, setIngredients] = useState([])
    const [instructions, setInstructions] = useState([])
    const [tags, setTags] = useState([])
    const [equipment, setEquipment] = useState([])
    const [timeScore, setTimeScore] = useState(null)
    const [overallScore, setOverallScore] = useState(null)
    const [nutritionScore, setNutritionScore] = useState(null)
    const [tastinessScore, setTastinessScore] = useState(null)
    const [costScore, setCostScore] = useState(null)
    const [displayPrepTime, setDisplayPrepTime] = useState(null)
    const [displayCookTime, setDisplayCookTime] = useState(null)
    const [displayTotalTime, setDisplayTotalTime] = useState(null)
    const [servingSelection, setServingSelection] = useState(null)
    const [servingSelectionIsOpen, setServingSelectionIsOpen] = useState(false)
    const [customServingsModalIsOpen, setCustomServingsModal] = useState(false)
    const [useInteractedWithCustomServing, setUseInteractedWithCustomServing] = useState(false)

    useEffect(() => {
        if (mongoData.length > 0) {
            const recipe = mongoData.find(recipe => recipe.slug === slug)
            if (recipe) {
                setCurrentRecipe(recipe)
            } else {
                setNotFound(true)
            }
            setIsLoading(false)
        }
    }, [mongoData, slug])

    useEffect(() => {
            if (mongoData.length > 0) {
                const recipe = mongoData.find(recipe => recipe.slug === slug)
                setCurrentRecipe(recipe)
                setIsLoading(false)
            }
        }, [mongoData, slug])

    function simplifyFraction(numerator, denominator) {
        const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b))
        const commonDevisor = gcd(numerator, denominator)
        const simplifiedNumerator = numerator / commonDevisor
        const simplifiedDenominator = denominator / commonDevisor
        return [simplifiedNumerator, simplifiedDenominator]
    }

    function toMixedNumber(simplifiedNumerator, simplifiedDenominator) {
        const wholeNumber = Math.floor(simplifiedNumerator / simplifiedDenominator)
        const numerator = simplifiedNumerator % simplifiedDenominator
        const mixedNumber = wholeNumber > 0 ? `${wholeNumber} ${numerator}/${simplifiedDenominator}` : `${numerator}/${simplifiedDenominator}`
        return mixedNumber;
    }

    const [simplifiedNumerator, simplifiedDenominator] = simplifyFraction(15, 4)
    const mixedNumber = toMixedNumber(simplifiedNumerator, simplifiedDenominator)

    // console.log(`${simplifiedNumerator}/${simplifiedDenominator}`)
    // console.log(mixedNumber)

    function formattedFraction(fraction) {
       const [numerator, denominator] = fraction.split('/')

       if (numerator > denominator) {
            const wholePart = Math.floor(numerator / denominator)
            const newNumerator = numerator % denominator

            if (newNumerator === 0) {
                return `${wholePart}`
            } else {
                const container = document.createElement('div')

                if (wholePart !== 0) {
                    const wholePartEl = document.createElement('span')
                    wholePartEl.className = 'number-pre-fraction'
                    wholePartEl.textContent = wholePart
                    container.appendChild(wholePartEl)
                }

                const childDiv = document.createElement('div')
                childDiv.className = 'fraction-container'

                const numeratorWithClass = document.createElement('span')
                numeratorWithClass.className = 'whole-number'
                numeratorWithClass.textContent = newNumerator
                childDiv.appendChild(numeratorWithClass)

                if (denominator) {
                    numeratorWithClass.className = 'numerator'
                    
                    const slash = document.createElement('span')
                    slash.className = 'fraction-slash'
                    slash.textContent = '/'
                    childDiv.appendChild(slash)
    
                    const denominatorWithClass = document.createElement('span')
                    denominatorWithClass.className = 'denominator'
                    denominatorWithClass.textContent = denominator
                    childDiv.appendChild(denominatorWithClass)
                }
    
                container.appendChild(childDiv)
    
                return container.innerHTML

            }
       } else {
            const container = document.createElement('div')

            const childDiv = document.createElement('div')
            childDiv.className = 'fraction-container'

            const numeratorWithClass = document.createElement('span')
            numeratorWithClass.className = 'whole-number'
            numeratorWithClass.textContent = numerator
            childDiv.appendChild(numeratorWithClass)

            if (denominator) {
                numeratorWithClass.className = 'numerator'
                
                const slash = document.createElement('span')
                slash.className = 'fraction-slash'
                slash.textContent = '/'
                childDiv.appendChild(slash)

                const denominatorWithClass = document.createElement('span')
                denominatorWithClass.className = 'denominator'
                denominatorWithClass.textContent = denominator
                childDiv.appendChild(denominatorWithClass)
            }

            container.appendChild(childDiv)

            return container.innerHTML
       }
    }

    useEffect(() => {
        if (currentRecipe) {
            const ingredientQuantityElements = document.querySelectorAll('.ingredient-quantity-preview')

            ingredientQuantityElements.forEach((element, index) => {
                
                const currentValue = parseFloat(element.textContent)
                const originalValue = parseFloat(currentRecipe.ingredients[index].ingredientQuantityDecimal)
                
                if (!isNaN(currentValue)) {
                    const newQuantity = (originalValue / currentRecipe.defaultServings) * servingSelection
                    const newQuantityAsFraction = decimalToFraction(newQuantity)
                    const formattedNewQuantityAsFraction = formattedFraction(newQuantityAsFraction)

                    element.innerHTML = formattedNewQuantityAsFraction == '0' ? '' : formattedNewQuantityAsFraction
                    element.classList.add('updated-quantity-animation')
                    setTimeout(() => {
                        element.classList.remove('updated-quantity-animation')
                    }, 1000)
                }
            })

            const timeDisclaimerEl = document.querySelector('.time-disclaimer')
            // const yieldEl = document.querySelector('.yield-el')

            if (servingSelection !== currentRecipe.defaultServings) {
                timeDisclaimerEl.classList.remove('hide')
                
                // yieldEl.classList.add('hide')
            } else {
                timeDisclaimerEl.classList.add('hide')
                
                // yieldEl.classList.remove('hide')
            }
        }
    }, [servingSelection])

    useEffect(() => {
        if (currentRecipe) {
            const ingredients = currentRecipe.ingredients.map(ingredient => {
                return (
                    <div key={ingredient.ingredientQuantity + ingredient.ingredientMeasurement + ingredient.ingredientName + ingredient.ingredientExtraDetail + ingredient.ingredientSectionName}
                             className='ingredient-preview-element'>
                            {!ingredient.ingredientSectionName && <span>
                                <div className='bullet-point'></div>
                            </span>}
                            <span className='ingredient-txt-wrapper'>
                                {ingredient.ingredientSectionName && <span className='ingredient-section-preview'>{ingredient.ingredientSectionName}</span>}
                                <span className='ingredient-quantity-preview'>{ingredient.ingredientQuantityDecimal}</span>
                                {ingredient.ingredientMeasurement && <span className='ingredient-measurement-preview'>{ingredient.ingredientMeasurement}</span>}
                                {ingredient.ingredientName && <span className='ingredient-name-preview'>{ingredient.ingredientName}</span>}
                                {ingredient.ingredientExtraDetail && <span className='ingredient-extra-detail-preview'>{ingredient.ingredientExtraDetail}</span>}
                            </span>
                    </div>
                )
            })
            let currentInstructionStep = 0
            const instructions = currentRecipe.instructions.map((instruction, index) => {
                if (instruction.instructionText) {
                    currentInstructionStep++
                    return (
                        <div key={index} className='instruction-item-container'>
                            <div className='instruction-step'>Step: {currentInstructionStep}
                                <div className='instruction-text'>{instruction.instructionText}</div>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div key={index} className='instruction-section-header'>
                            <div>{instruction.instructionSection}</div>
                        </div>
                    )
                }
            })

            const tags = currentRecipe.tags.map(tag => {
                return (
                    <span key={tag}
                    className='taglist'> #{tag} </span>
                )
            })

            const equipment = currentRecipe.equipment.map((item, index) => {
                return (
                    <div key={index}><a href={`${item.equipmentLink}`} target='_blank'>{item.equipmentName}</a></div>
                )
            })
            setIngredients(ingredients)
            setTags(tags)
            setInstructions(instructions)
            setEquipment(equipment)

            setHasBeenCookedToday(() => {
                const userTimezoneOffset = new Date().getTimezoneOffset() * 60000
                const currentDateInUserTimezone = new Date(Date.now() - userTimezoneOffset)
                const currentDay = currentDateInUserTimezone.toISOString().split('T')[0]
                const lastCookedDay = currentRecipe.cookingHistoryArray.length > 0 ? currentRecipe.cookingHistoryArray[currentRecipe.cookingHistoryArray.length - 1] : new Date(2023, 0, 1).toISOString()

                const lastCookedDayDate = new Date(lastCookedDay)
                const lastCookedDayTimestamp = lastCookedDayDate.getTime()
                const lastCookedDayInUserTimezone = new Date(lastCookedDayTimestamp - userTimezoneOffset)
                const lastCookedDayString = lastCookedDayInUserTimezone.toISOString().split('T')[0]
                // console.log(lastCookedDayString, "lastCookedDayString")

                // console.log("current day", currentDay)
                // console.log("last cooked day", lastCookedDayString)

                return currentDay === lastCookedDayString
            })

            const checkmarkEl = document.getElementById('checkmark')
            console.log(checkmarkEl)
            if (checkmarkEl) {
                hasBeenCookedToday ? checkmarkEl.classList.remove('hide') : checkmarkEl.classList.add('hide')
            }

            setTimeScore(() => {
                if(currentRecipe.totalCooktime <= 30) {
                    return 10
                } else if(currentRecipe.totalCooktime <= 45) {
                    return 9
                } else if(currentRecipe.totalCooktime <= 60) {
                    return 8
                } else if(currentRecipe.totalCooktime <= 75) {
                    return 7
                } else if(currentRecipe.totalCooktime <= 90) {
                    return 6
                } else if(currentRecipe.totalCooktime <= 105) {
                    return 5
                } else if(currentRecipe.totalCooktime <= 120) {
                    return 4
                } else if(currentRecipe.totalCooktime <= 135) {
                    return 3
                } else if(currentRecipe.totalCooktime <= 150) {
                    return 2
                } else if(currentRecipe.totalCooktime <= 175) {
                    return 1
                } else {
                    return 0
                }
            }) 

            setDisplayPrepTime(
                currentRecipe.prepTimeHours > 0 ?
                `${(currentRecipe.prepTimeHours * 60) + currentRecipe.prepTimeMins} mins` : currentRecipe.prepTimeMins > 0 ? `${currentRecipe.prepTimeMins} mins` :
                '0 mins'
            )

            setDisplayCookTime(
                currentRecipe.cooktimeHours > 0 ?
                `${(currentRecipe.cooktimeHours * 60) + currentRecipe.cooktimeMins} mins` : currentRecipe.cooktimeMins > 0 ? `${currentRecipe.cooktimeMins} mins` :
                '0 mins'
            )

            setDisplayTotalTime(     
                convertTotalMinutesToHoursAndMinutes(currentRecipe.totalCooktime)
            )

            setServingSelection(currentRecipe.defaultServings)
                           
            setOverallScore((((currentRecipe.nutritionScore + currentRecipe.costScore + currentRecipe.tastinessScore + currentRecipe.timeScore) / 40) * 10).toFixed(1))
            setNutritionScore(currentRecipe.nutritionScore)
            setTastinessScore(currentRecipe.tastinessScore)
            setCostScore(currentRecipe.costScore)
        }
    }, [currentRecipe])

    function convertTotalMinutesToHoursAndMinutes(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60)
        const minutes = totalMinutes % 60

        const displayHours = `${hours} hour${hours > 1 ? 's' : ''}`
        const displayMinutes = `${minutes} minute${minutes > 1 ? 's' : ''}`
        
        const result = `${hours > 0 ? displayHours : ''} ${minutes > 0 ? displayMinutes : ''}`

        return result
    }

    const handleStarClick = (e) => {
        e.stopPropagation()
        handleMongoFavoriteToggle(currentRecipe._id, currentRecipe.recipeName, currentRecipe.isFavorited)
    }

    const handleBellClick = (e) => {
        e.stopPropagation()
        console.log("running")
        handleMongoRequestToggle(currentRecipe._id, currentRecipe.recipeName, currentRecipe.isRequested)
    }

    const handleCheckboxClick = (e) => {
        e.stopPropagation()
        if (!hasBeenCookedToday) {
            addNewCookedDate(currentRecipe._id, currentRecipe.recipeName, currentRecipe.cookingHistoryArray)
            setHasBeenCookedToday(true)
        }
    }

    const handleServingSizeClick = (e) => {
        e.stopPropagation()
        setServingSelectionIsOpen(!servingSelectionIsOpen)
    }

    const handleCustomServingsClick = (e) => {
        setUseInteractedWithCustomServing(false)
        setCustomServingsModal(!customServingsModalIsOpen)
        setServingSelectionIsOpen(false)
    }

    const handleCustomServingChange = (e) => {
        if (e.target.value > 0 && e.target.value < 1001) {
            setUseInteractedWithCustomServing(true)
            setServingSelection(e.target.value)
        } else {
            setUseInteractedWithCustomServing(false)
        }
    }

    const handleServingPlusClick = (e) => {
        if (parseInt(servingSelection, 10) < 1000) {
            setServingSelection(prevSelection => parseInt(prevSelection, 10) + 1)
            setUseInteractedWithCustomServing(true)
        }
    }

    const handleServingMinusClick = (e) => {
        if (parseInt(servingSelection, 10) > 1 && parseInt(servingSelection, 10) < 1000) {
            setServingSelection(prevSelection => parseInt(prevSelection, 10) - 1)
            setUseInteractedWithCustomServing(true)
        }
    }

    function convertAndFormatDate(dateInUTC) {
        const userTimezoneOffset = new Date().getTimezoneOffset() * 60000
        const parsedDate = Date.parse(dateInUTC)

        if (!isNaN(parsedDate)) {
            const unformattedDate = new Date(parsedDate - userTimezoneOffset)
            const formattedDate = unformattedDate.toLocaleDateString('en-US', {
                month: 'numeric',
                day: '2-digit',
                year: 'numeric'
            })
            return formattedDate
        } else {
            console.log("Invalid Date")
        }
    }

    // const [hasBeenCookedToday, setHasBeenCookedToday] = useState(() => {
    //     const userTimezoneOffset = new Date().getTimezoneOffset() * 60000
    //     const currentDateInUserTimezone = new Date(Date.now() - userTimezoneOffset)
    //     const currentDay = currentDateInUserTimezone.toISOString().split('T')[0]

    //     console.log(currentDay)
    //     console.log(currentRecipe)
    //     currentDay === currentRecipe.cookingHistoryArray[currentRecipe.cookingHistoryArray.length - 1] ? console.log('Yes! we have a match') : console.log('no match')
    //     return currentDay === cookedArray[cookedArray.length - 1]
    //     // return currentDay === currentRecipe.lastCookedDate
    // })

    const [hasBeenCookedToday, setHasBeenCookedToday] = useState(false)

    useEffect(() => {
        const checkmarkEl = document.getElementById('checkmark')
        console.log(checkmarkEl)
        if (checkmarkEl) {
            hasBeenCookedToday ? checkmarkEl.classList.remove('hide') : checkmarkEl.classList.add('hide')
        }
    }, [hasBeenCookedToday])

    const overallScoreStyle = {
        width: `${overallScore * 10}% `,
        background: '#A541F3',
        height: '100%',
        borderRadius: '.25em'
    }

    const nutritionScoreStyle = {
        width: `${nutritionScore * 10}% `,
        background: '#71FF5A',
        height: '100%',
        borderRadius: '.25em'
    }
    const tastinessScoreStyle = {
        width: `${tastinessScore * 10}% `,
        background: '#FFF960',
        height: '100%',
        borderRadius: '.25em'
    }

    const timeScoreStyle = {
        width: `${timeScore * 10}% `,
        background: '#FF3AC8',
        height: '100%',
        borderRadius: '.25em'
    }

    const costScoreStyle = {
        width: `${costScore * 10}% `,
        background: '#60D9FF',
        height: '100%',
        borderRadius: '.25em'
    }

    if (isLoading) {
        return (
            <main className='loading-message'>
                Loading...
            </main>
        )
    } else if (notFound) {
        return (
            <main className='loading-message'>404 not found</main>
        )
    } else {
        return (
            <main className='recipe-page'>
                <div className='recipe-page-icon-container'>
                    <Link to={prevPathHome ? '/' : '/recipes'}>
                        <div className='recipe-page-back-arrow-container no-margin'>
                            <img src={arrow} className="arrowHead back-arrowhead"/>
                            <div className='back-arrow'></div>
                        </div>
                    </Link>
                    <div className='recipe-page-icon-buttons'>
                        <img className='recipe-page-bell' src={currentRecipe.isRequested ? filledBell : greyBell} onClick={handleBellClick} />
                        <img className='recipe-page-star' src={currentRecipe.isFavorited ? filledYellowStar : greyStar} onClick={handleStarClick} />
                    </div>
                </div>
    
                <div className='recipe-page-hero' style={{backgroundImage: `linear-gradient(12deg, rgba(0, 0, 0, .95), rgba(0, 0, 0, 0) 45%), url(${currentRecipe.imgUrl})`}}>
                    <div>
                        <h1 id='recipe-title-overlay'>{currentRecipe.recipeName}</h1>
                        <div id='recipe-subtitle-overlay'>{currentRecipe.recipeSubName}</div>
                    </div>
                </div>

                {/* <h1 id='recipe-page-title'>{currentRecipe.recipeName}</h1>
                <h2 id='recipe-page-subtitle'>{currentRecipe.recipeSubName}</h2> 

                <div className='recipe-page-hero' style={{backgroundImage: `url(${currentRecipe.imgUrl})`}}></div>*/}

                

                <div className='info-overview'>
                    <div className='dificulty-overview'>
                        <div className='grey-text'>difficulty:</div>
                        <div className='weight600'>{currentRecipe.difficultyRating}</div>
                    </div>
                    <div className='time-overview-container'>
                        <div className='time-overview'>
                            <div className='time-overview-img'><img className='overview-timer-icon' src={timerIcon}></img></div>
                            <div>
                                <div className='time-overview-text'>{displayTotalTime}</div>
                                <div className='time-overview-subtext'>prep: {displayPrepTime}</div>
                                <div className='time-overview-subtext'>cook: {displayCookTime}</div>
                            </div>
                        </div>
                        
                    </div>
                    <div className='serving-overview'>
                        <div className='grey-text'>serving{servingSelection > 1 ? 's' : ''}:</div>
                        <div className='weight600'>{servingSelection}</div>
                        {/* <div className='yield-el'>{currentRecipe.recipeYield && <div>{currentRecipe.recipeYield}</div>}</div> */}
                    </div>
                </div>
                <div className='time-disclaimer hide'>*This cook time is based on a serving size of {currentRecipe.defaultServings}.</div>
    
                <section className='ingredients-section'>
                    <div className='ingredients-section-title-container' onClick={handleServingSizeClick}>
                        <h4 className='section-title'>Ingredients</h4>
                        <div className='dynamic-servings-current-selection'>
                            <div className='current-serving-display'>{servingSelection} serving{servingSelection > 1 ? 's' : ''}
                                <div className='gray-down-arrow'></div>
                            </div>
                            {servingSelectionIsOpen && <div className='dynamic-servings-selection-container'>
                                    <div onClick={() => {setServingSelection(2)}}>2 servings</div>
                                    <div onClick={() => {setServingSelection(4)}}>4 servings</div>
                                    <div onClick={() => {setServingSelection(6)}}>6 servings</div>
                                    <div onClick={() => {setServingSelection(8)}}>8 servings</div>
                                    <div onClick={handleCustomServingsClick}>custom</div>
                                </div>}
                            {customServingsModalIsOpen && <div className="servings-modal-container" onClick={handleCustomServingsClick}>
                                <div className="custom-servings-modal" onClick={(e) => e.stopPropagation()}>
                                    <div>
                                        <div className='close-btn-container' onClick={() => {setCustomServingsModal(false)}}>
                                            <img src={closeIcon} />
                                        </div>
                                        <label className='custom-serving-label' htmlFor="custom-serving">Customize serving size:</label>
                                        <div className='custom-serving-input-container'>
                                            <div className='plus-minus-btn' onClick={handleServingMinusClick}>-</div>
                                            <input type="number" min={1} max={1000} id="custom-serving" name="customServing" className='has-placeholder'
                                            placeholder={servingSelection} value={useInteractedWithCustomServing ? servingSelection : ''} 
                                            onChange={handleCustomServingChange} onKeyDown={(e) => e.key === 'Enter' ? setCustomServingsModal(false) : null} onBlur={() => setUseInteractedWithCustomServing(true)}></input>
                                            <div className='plus-minus-btn' onClick={handleServingPlusClick}>+</div>
                                        </div>                                 
                                        <div className='ok-button-container'>
                                                <div className='ok-button' onClick={() => {setCustomServingsModal(false)}}>okay</div>
                                        </div>
                                    </div>
                                </div>  
                            </div>}
                        </div>               
                    </div>
                    
                    <div className='section-arrow-container'>
                        <img src={arrow} className="arrowHead section-arrowhead"/>
                    </div>
    
                    <div className='section-content-container ingredients-content-container'>
                        {ingredients}
                    </div>
                </section>
    
                <section className='instructions-section'>
                            
                    <h4 className='section-title'>Instructions</h4>
                    <div className='section-arrow-container'>
                        <img src={arrow} className="arrowHead section-arrowhead"/>
                    </div>
                    
                    <div className='section-content-container'>
                        {instructions}
                    </div>
    
                </section>
    
                {currentRecipe.notes && <section className='notes-section'>
                            
                    <h4 className='section-title'>Notes</h4>
                    <div className='section-arrow-container'>
                        <img src={arrow} className="arrowHead section-arrowhead"/>
                    </div>
                    
                    <div className='section-content-container'>
                        <p className='show-line-breaks'>{currentRecipe.notes}</p>
                    </div>
    
                </section>}

                {currentRecipe.equipment.length > 0 && <section className='notes-section'>
                            
                    <h4 className='section-title'>Equipment Needed</h4>
                    <div className='section-arrow-container'>
                        <img src={arrow} className="arrowHead section-arrowhead"/>
                    </div>
                    
                    <div className='section-content-container'>
                        {equipment}
                    </div>
    
                </section>}
    
                <section className='stats-section'>
                            
                    <h4 className='section-title'>Community Ratings</h4>
                    <div className='section-arrow-container'>
                        <img src={arrow} className="arrowHead section-arrowhead"/>
                    </div>
                    
                    <div className='section-content-container'>
                        <div className='overall-score-container'>Overall Score: <span className='weight600'>{overallScore} </span>/10
                            <div className='score-bar-background'>
                                <div className='overall-score-bar' style={overallScoreStyle}></div>
                            </div>
                        </div>
                        <div className='recipe-scores-container'>

                            <div className='score-data-container'>
                                <div className='score-bar-icon-container'>
                                    <img className='score-icon rotate180' src={thumbIcon}></img>
                                    <img className='score-icon ' src={thumbIcon}></img>
                                </div>
                                <div className='score-bar-background'>
                                    <div className='nutrition-score-bar' style={nutritionScoreStyle}></div>
                                </div>
                                <div className='score-text-container'>
                                    <span className='score-label-text'>Nutrition: </span>
                                    <span className='score-number-text'>{currentRecipe.nutritionScore}/10</span>
                                </div>
                            </div>
                            <div className='score-data-container'>
                                <div className='score-bar-icon-container'>
                                    <img className='score-icon rotate180' src={thumbIcon}></img>
                                    <img className='score-icon ' src={thumbIcon}></img>
                                </div>
                                <div className='score-bar-background'>
                                    <div className='nutrition-score-bar' style={tastinessScoreStyle}></div>
                                </div>
                                <div className='score-text-container'>
                                    <span className='score-label-text'>Tastiness: </span>
                                    <span className='score-number-text'>{tastinessScore}/10</span>
                                </div>
                            </div>
                            <div className='score-data-container'>
                                <div className='score-bar-icon-container'>
                                    <div className='timer-icon-container'>
                                        <img className='timerIcon' src={thickTimer}></img>
                                        <img className='timerIcon' src={thickTimer}></img>
                                        <img className='timerIcon' src={thickTimer}></img>
                                    </div>
                                    <img className='timerIcon' src={thickTimer}></img>
                                </div>
                                <div className='score-bar-background'>
                                    <div className='nutrition-score-bar' style={timeScoreStyle}></div>
                                </div>
                                <div className='score-text-container'>
                                    <span className='score-label-text'>Cook Time: </span>
                                    <span className='score-number-text'>{timeScore}/10</span>
                                </div>
                            </div>
                            <div className='score-data-container'>
                                <div className='score-bar-icon-container'>
                                    <div className='cost-icon-container'>$$$</div>
                                    <div>$</div>
                                </div>
                                <div className='score-bar-background'>
                                    <div className='nutrition-score-bar' style={costScoreStyle}></div>
                                </div>
                                <div className='score-text-container'>
                                    <span className='score-label-text'>Cost: </span>
                                    <span className='score-number-text'>{costScore}/10</span>
                                </div>
                            </div>
                            
                        </div>
                        <div><span className='weight600'>Total Times Cooked: </span> {currentRecipe.cookingHistoryArray.length}</div>
                        {(currentRecipe.cookingHistoryArray.length > 0) && <div><span className='weight600'>Last Cooked: </span> 
                            {convertAndFormatDate(currentRecipe.cookingHistoryArray[currentRecipe.cookingHistoryArray.length - 1])}</div>}
                    </div>
    
                </section>

                {tags.length > 0 && <section className='tags-section'>
                    <h4 className='section-title'>Tags</h4>
                    <div className='section-arrow-container'>
                        <img src={arrow} className="arrowHead section-arrowhead"/>
                    </div>
    
                    <div className='section-content-container tags-container'>
                        {tags}
                    </div>
                </section>}

                {currentRecipe.originalRecipeLink && <section className='original-link-section'>
                    <h4 className='section-title'>Original Recipe Link</h4>
                    <div className='section-arrow-container'>
                        <img src={arrow} className="arrowHead section-arrowhead"/>
                    </div>
    
                    <div className='section-content-container'>
                        <a href={`${currentRecipe.originalRecipeLink}`} target='_blank'>{currentRecipe.originalRecipeLink}</a>
                    </div>
                </section>}

                <div className='checkbox-container'>
                    <div id="completed-checbox" onClick={handleCheckboxClick}>
                        {hasBeenCookedToday && <img src={checkmark} id='checkmark'/>}
                    </div>
                    <div>
                        <div className='completed-text'>Check box after cooking</div>
                        <div>(to add to stats)</div>
                    </div>
                </div>

                <div className='edit-text-container'>
                    <Link to={`/${currentRecipe.slug}/edit`} className='edit-recipe-link'>
                        <div className='edit-text'>Edit this recipe</div>
                    </Link>
                </div>
    
                <Link to='/' className='back-arrow-link'>
                    <div className='recipe-page-back-arrow-container bottom-back-arrow'>
                        <img src={arrow} className="arrowHead back-arrowhead"/>
                        <div className='back-arrow'></div>
                        <span id='back-text'>back</span>
                    </div>
                </Link>
    
            
            </main>
        )
    }
}