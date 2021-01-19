import React from 'react'
import {
  pdf,
  Document,
  Page,
  Text,
  View,
  Font,
  Image
} from '@react-pdf/renderer'
import PropTypes from 'prop-types'
import { saveAs } from 'file-saver'
import CardMembershipIcon from '@material-ui/icons/CardMembership'

const today = new Date()
const time = today.getHours() + ':' + today.getMinutes()

const weekdays = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado'
]
const weekdayNumber = new Date().getDay()
const weekdayName = weekdays[weekdayNumber]

const month = new Date()
const currentMonth = month.toLocaleString('es-ES', { month: 'long' })

const year = new Date().getFullYear()

function ReactPDF ({ projectId, projectName, projectLocation, projectValueInNumbers, projectValueInLetters, s3 }) {
  const awsURL = s3.attached[0].letterHead
  const signature = s3.attached[0].attachedSignature
  return (
    <Document>
      <Page>
        <Image source={awsURL} style={{ position: 'relative' }} />
        <View style={{ margin: 10, padding: 10, flexGrow: 1, position: 'absolute' }}>
          <Text style={{ fontSize: 11, marginLeft: 480, marginTop: 120, textAlign: 'center', fontFamily: 'Oswald', position: 'absolute', fontWeight: 400 }}>
            {projectId}
          </Text>
          <Text style={{ fontSize: 24, marginLeft: 220, marginTop: 150, textAlign: 'center', fontFamily: 'Oswald', position: 'absolute' }}>
            CERTIFICACIÓN
          </Text>
          <View>
            <Text style={{ marginTop: 200, marginLeft: 40, fontSize: 14, fontFamily: 'Times-Roman', position: 'absolute' }}>
              El Gobernador del Cabildo indígena Quillasinga de Tangua Montaña de fuego, del
            </Text>
            <Text style={{ marginTop: 215, marginLeft: 40, fontSize: 14, fontFamily: 'Times-Roman', position: 'absolute' }}>
              municipio de {' '} {projectLocation}, CERTIFICA que en el Banco de Proyectos para la implementación
            </Text>
            <Text style={{ marginTop: 230, marginLeft: 40, fontSize: 14, fontFamily: 'Times-Roman', position: 'absolute' }}>
              del plan de vida de la Comunidad, se encuentra registrado el siguiente proyecto:
            </Text>
          </View>
          <Text style={{ marginTop: 270, marginLeft: 50, fontSize: 14, textAlign: 'justify', fontFamily: 'Times-Roman', position: 'absolute' }}>
            Nombre del proyecto: {projectName}
          </Text>
          <Text style={{ marginTop: 290, marginLeft: 50, fontSize: 14, textAlign: 'justify', fontFamily: 'Times-Roman', position: 'absolute' }}>
            Ubicación: {projectLocation}
          </Text>
          <Text style={{ marginTop: 310, marginLeft: 50, fontSize: 14, textAlign: 'justify', fontFamily: 'Times-Roman', position: 'absolute' }}>
            Valor: {projectValueInNumbers} ({projectValueInLetters})
          </Text>
          <Text style={{ marginTop: 370, marginLeft: 50, fontSize: 14, textAlign: 'justify', fontFamily: 'Times-Roman', position: 'absolute' }}>
            Esta certificación se genera el día {weekdayName} del mes {currentMonth} del año {year} siendo las {time}
          </Text>
          <Text style={{ marginTop: 440, marginLeft: 50, fontSize: 14, textAlign: 'justify', fontFamily: 'Times-Roman', position: 'absolute' }}>
            Firma Autorizada,
          </Text>
          <Image source={signature} style={{ position: 'absolute', left: 65, marginTop: 470, width: 50, height: 50 }} />
          <Text
            style={{ position: 'absolute', fontSize: 12, bottom: 30, left: 0, right: 0, textAlign: 'center', color: 'grey' }}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`}
            fixed
          />
        </View>
      </Page>
    </Document>
  )
}

const LazyDownloadPDFButton = ({ id, projectName, projectLocation, projectValueInNumbers, projectValueInLetters, awsURL }) => (
  <CardMembershipIcon
    onClick={async () => {
      const doc = <ReactPDF projectId={id} projectName={projectName} projectLocation={projectLocation} projectValueInNumbers={projectValueInNumbers} projectValueInLetters={projectValueInLetters} s3={awsURL} />
      const asPdf = pdf([]) // [] is important, throws without an argument
      asPdf.updateContainer(doc)
      const blob = await asPdf.toBlob()
      saveAs(blob, 'Información del Proyecto.pdf')
    }}
    cursor='pointer'
  />
)

LazyDownloadPDFButton.propTypes = {
  projectLocation: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired,
  projectValueInLetters: PropTypes.string.isRequired,
  projectValueInNumbers: PropTypes.string.isRequired,
  awsURL: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
}

ReactPDF.propTypes = {
  projectLocation: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired,
  projectValueInLetters: PropTypes.string.isRequired,
  projectValueInNumbers: PropTypes.string.isRequired,
  s3: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired
}

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
})

export default LazyDownloadPDFButton
