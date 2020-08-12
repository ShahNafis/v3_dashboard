import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { ResumeTaggingData } from '../../../interfaces'

interface Props {
  data: ResumeTaggingData[]
}

export function ResumeTagging(props: Props) {
  const classes = useStyles()
  const { data = [] } = props
  return (
    <React.Fragment>
      {data.length > 0 ? (
        <React.Fragment>
          <Typography
            variant="h6"
            component="h1"
            gutterBottom
            color="secondary"
            style={{ paddingTop: 20 }}
          >
            Continue tagging from collections below.
          </Typography>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Catalog</TableCell>
                  <TableCell align="center">Archive</TableCell>
                  <TableCell align="center" padding="default">
                    Total Tagged
                  </TableCell>
                  <TableCell align="center" padding="default"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((dataEntry, index) => {
                  const {
                    archive,
                    archiveId,
                    catalog,
                    catalogId,
                    tagCount,
                  } = dataEntry
                  return (
                    <TableRow key={catalog.name + ' ' + index}>
                      <TableCell component="th" scope="row">
                        {catalog.name}
                      </TableCell>
                      <TableCell align="center">{archive.name}</TableCell>
                      <TableCell align="center">
                        {tagCount}/{archive.totalImages}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            (location.href = `/auth/tag/${catalogId}/${archiveId}`)
                          }
                        >
                          Resume
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </React.Fragment>
      ) : (
        <Typography variant="body1" component="h1" gutterBottom>
          <Paper elevation={3} variant="outlined" style={{ padding: 10 }}>
            No archives to resume tagging from.
          </Paper>
        </Typography>
      )}
    </React.Fragment>
  )
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})
