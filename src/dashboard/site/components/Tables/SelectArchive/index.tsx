import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import { Alert, AlertTitle } from '@material-ui/lab'
import Button from '@material-ui/core/Button'

import { CatalogSelectionData } from '../../../../interfaces'
import { theme } from '../../theme'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  headerText: {
    color: theme.palette.secondary.main,
  },
  header:{
    backgroundColor: theme.palette.common.black,
  }
})

function Row(props: { row: CatalogSelectionData }) {
  const { row } = props
  const [open, setOpen] = React.useState(false)
  const classes = useRowStyles()

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.totalImages}</TableCell>
        <TableCell align="right">{row.catalogInfo.year}</TableCell>
        <TableCell align="right">
          <Button
            href={row.catalogInfo.link}
            color="primary"  
            size="small"
            variant="contained"
          >
            More Info
          </Button>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Alert severity="info" color="info" variant="outlined" style={{marginBottom:theme.spacing(1)}}>
                <AlertTitle>Info</AlertTitle>
                <Typography variant="h6" gutterBottom component="div">
                  {row.catalogInfo.description}
                </Typography>
              </Alert>

              
              <Table size="small" aria-label="purchases">
              
                <TableHead>
                  <TableRow className = {classes.header}>
                    <TableCell className={classes.headerText}>Archive</TableCell>
                    <TableCell className={classes.headerText}>Total Images</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                
                <TableBody>
                  {row.archives.map((archiveRow, index) => (
                    
                    <TableRow key={archiveRow.name + index}>
                      <TableCell component="th" scope="row">
                        {archiveRow.name}
                      </TableCell>
                      <TableCell>{archiveRow.totalImages}</TableCell>
                      <TableCell>
                        <Button
                          href={`#catalog=${row._id}?archive=${archiveRow._id}`}
                          color="primary"  
                          size="small"
                          variant="contained"
                        >
                          Tag
                        </Button>
                      </TableCell>
                    </TableRow>  
                  ))}
                </TableBody>
               
              </Table>
              
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

interface Props {
  data: CatalogSelectionData[]
}

export function SelectArchive(props: Props) {
  const { data } = props
  const classes = useRowStyles()

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow className = {classes.header}>
            <TableCell />
            <TableCell className={classes.headerText}>Catalog</TableCell>
            <TableCell className={classes.headerText} align="right">
              Total Images
            </TableCell>
            <TableCell className={classes.headerText} align="right">
              Year
            </TableCell>
            <TableCell className={classes.headerText} align="right">
              Link
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
