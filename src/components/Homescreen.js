import Card from './Card'
import Suggested from './Suggested'

export default function Homescreen() {
    return (
            <main>
                <Suggested 
                    title="Suggested"
                />
                <div className="cardSecionContainer">
                    <div className="cardSectionHeading">
                        <h3>Requests</h3>
                        <div className="scrollArrow"></div>
                    </div>
                    <div className="cardsScrollContainer">
                        <div className="cardsContainer">
                            
                        </div>
                    </div>
                </div>
            </main>
    )
}