import stage from "../assets/computerPrinter.png";
import '../styles.css';

export default function StagePrinter({code}) {

    console.log(code, 'this is code')


    return(
        <div>{
            code === '' ?
                'segunda validação'
            :
                <img id="stagePrinterIcon" src={stage} alt="imagem de impressora." />
            }
        </div>
    )
}