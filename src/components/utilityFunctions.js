import Fraction from 'fraction.js'

export function parseFraction(fraction, setInvalidQuantityMessage) {
    const parts = fraction.split(' ')
    parts.length > 2 ? setInvalidQuantityMessage(true) : setInvalidQuantityMessage(false)
    let totalValue = 0
   
    console.log('parts', parts)

    parts.forEach(part => {
        if (part.includes('/') && part.length > 2) {
            const [numerator, denominator] = part.split('/')
            const fractionValue = parseFloat(numerator) / parseFloat(denominator)
            totalValue += fractionValue
        } else if (part.includes('¼') || part.includes('½') || part.includes('¾') || part.includes('⅐') || part.includes('⅑') ||
        part.includes('⅒') || part.includes('⅓') || part.includes('⅔') || part.includes('⅖') || part.includes('⅗') ||
        part.includes('⅘') || part.includes('⅙') || part.includes('⅚') || part.includes('⅛') || part.includes('⅜') || 
        part.includes('⅝') || part.includes('⅞')){
            if (part.includes('¼')) {
                const [numerator, denominator] = [1, 4]
                totalValue += numerator / denominator
            } else if (part.includes('½')) {
                const [numerator, denominator] = [1, 2]
                totalValue += numerator / denominator
            } else if (part.includes('¾')) {
                const [numerator, denominator] = [3, 4]
                totalValue += numerator / denominator
            } else if (part.includes('⅐')) {
                const [numerator, denominator] = [1, 7]
                totalValue += numerator / denominator
            } else if (part.includes('⅑')) {
                const [numerator, denominator] = [1, 9]
                totalValue += numerator / denominator
            } else if (part.includes('⅒')) {
                const [numerator, denominator] = [1, 10]
                totalValue += numerator / denominator
            } else if (part.includes('⅓')) {
                const [numerator, denominator] = [1, 3]
                totalValue += numerator / denominator
            } else if (part.includes('⅔')) {
                const [numerator, denominator] = [2, 3]
                totalValue += numerator / denominator
            } else if (part.includes('⅖')) {
                const [numerator, denominator] = [2, 5]
                totalValue += numerator / denominator
            } else if (part.includes('⅗')) {
                const [numerator, denominator] = [3, 5]
                totalValue += numerator / denominator
            } else if (part.includes('⅘')) {
                const [numerator, denominator] = [4, 5]
                totalValue += numerator / denominator
            } else if (part.includes('⅙')) {
                const [numerator, denominator] = [1, 6]
                totalValue += numerator / denominator
            } else if (part.includes('⅚')) {
                const [numerator, denominator] = [5, 6]
                totalValue += numerator / denominator
            } else if (part.includes('⅛')) {
                const [numerator, denominator] = [1, 8]
                totalValue += numerator / denominator
            } else if (part.includes('⅜')) {
                const [numerator, denominator] = [3, 8]
                totalValue += numerator / denominator
            } else if (part.includes('⅝')) {
                const [numerator, denominator] = [5, 8]
                totalValue += numerator / denominator
            } else if (part.includes('⅞')) {
                const [numerator, denominator] = [7, 8]
                totalValue += numerator / denominator
            }
            console.log('this includes a vulgar fraction')
        } else {
            totalValue += parseFloat(part) || 0
        }
    })
    totalValue = parseFloat(totalValue.toFixed(4))
    console.log('total value', totalValue)
    return totalValue
}

export function decimalToFraction(decimal) {
    const fraction = new Fraction(decimal)
    const simplifiedFraction = fraction.simplify()
    const fractionString = simplifiedFraction.toFraction()
    const wholeNumber = Math.floor

    return `${fractionString}`
}