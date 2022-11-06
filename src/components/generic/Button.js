import "./Button.css";
import playIcon from '../../images/icons8-play-96.png';
import pauseIcon from '../../images/icons8-pause-96.png';
import resetIcon from '../../images/icons8-replay-96.png';
import stopIcon from '../../images/icons8-stop-96.png';

//Note: icons downloaded from https://icons8.com

const Button = ({ text, ...btnProps }) => {

  return (
    <button
      {...btnProps}
    >

    {text === 'Start' &&
      <img src={playIcon} width="30" alt="Start" title="Start"/>
    }
    {text === 'Pause' &&
      <img src={pauseIcon} width="30" alt="Pause" title="Pause" />
    }
    {text === 'End' &&
      <img src={stopIcon} width="30" alt="End" title="End"/>
    }
    {text === 'Reset' &&
      <img src={resetIcon} width="30" alt="Reset" title="Reset"/>
    }
          
    </button>
  );
};

Button.defaultProps = { text: 'Start', className:'btn-active' }; 

export default Button;
