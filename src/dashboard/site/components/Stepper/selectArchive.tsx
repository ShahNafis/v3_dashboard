import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import { Alert, AlertTitle } from '@material-ui/lab';
//import Divider from '@material-ui/core/Divider';

import { Dropdown } from '../Dropdown'
import { CatalogSelectionData } from '../../../interfaces'
import { theme } from '../theme'

interface Props {
  data: CatalogSelectionData[]
}

export function SelectArchive(props: Props) {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)

  const [selectedCatalog, setCatalog] = React.useState(-1)
  const [selectedArchive, setArchive] = React.useState(-1)

  const steps = getSteps()

  const { data } = props

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  function getStepContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return (
          <Dropdown
            label="Select Catalog"
            data={data}
            selectedItem={selectedCatalog}
            setItem={setCatalog}
          />
        )
      case 1:
        return (
            <Dropdown
              label="Select Archive"
              data={data[selectedCatalog].archives}
              selectedItem={selectedArchive}
              setItem={setArchive}
            />
          )
      default:
        return 'Unknown stepIndex'
    }
  }

  function determineStepDisabled(activeStep: number) {
    switch (activeStep) {
    case 0:
        return (
            selectedCatalog === -1
        )
    case 1:
        return (
            selectedArchive === -1
        )
    default:
        return false
    }
  }

  function LabelText(props) {
      return (
        <React.Fragment>
            <strong style={{color:theme.palette.secondary.main}}>
                {props.label}
            </strong>: {props.text}
            <br/>
        </React.Fragment>
      )
  }
  function showData() {
    
    const showCatalog = selectedCatalog >= 0
    const showArchive = selectedArchive >= 0
    return (
        <div>
            <Alert severity="info" color="info" variant="outlined" >
            <AlertTitle>Info</AlertTitle>
            { showCatalog && 
                <div>
                    <LabelText label="Catalog Name" text={data[selectedCatalog].name}/>
                    <LabelText label="Catalog Year" text={data[selectedCatalog].catalogInfo.year}/>
                    <LabelText label="Catalog Desc" text={data[selectedCatalog].catalogInfo.description}/>
                    <LabelText label="Catalog Link" text={data[selectedCatalog].catalogInfo.link}/>
                    <LabelText label="Catalog # of Images" text={data[selectedCatalog].totalImages}/>
                </div>
            }
            { showArchive && 
                <div>
                    <LabelText 
                        label="Archive Name" 
                        text={data[selectedCatalog]?.archives[selectedArchive]?.name}
                    />
                    <LabelText 
                        label="Archive # of Images" 
                        text={data[selectedCatalog]?.archives[selectedArchive].totalImages}
                    />
                </div>
            }
            
            </Alert>
        </div>
    )
  }
  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {/* {'>' + selectedCatalog + '<'}
      <br />
      {'>' + selectedArchive + '<'} */}
      <div>
        <Paper variant="outlined" square style={{ padding: 24 }}>
          <Container maxWidth="md">
            {activeStep === steps.length ? (
              <div>
                <Typography>All steps completed</Typography>
                <Button onClick={handleReset}>Reset</Button>
              </div>
            ) : (
              <div>
                <div className = {classes.center}>
                  {getStepContent(activeStep)}
                </div>
                <div className = {classes.alert}>
                  {showData()}
                </div>
                
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    disabled={determineStepDisabled(activeStep)}
                  >
                    {activeStep === steps.length - 1 ? 'Get Image' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
          </Container>
        </Paper>
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      display: 'flex',
      justifyContent: 'center',
    },
    center: {
        display: 'flex',
        justifyContent: 'center', 
    },
    alert: {
        marginBottom: theme.spacing(1),
    }
  })
)

function getSteps() {
  return ['Select Catalog', 'Select Archive']
}
