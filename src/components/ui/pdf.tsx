import {
  Document,
  Page,
  StyleSheet,
  View,
  Text,
  PDFViewer,
} from "@react-pdf/renderer";
import { ToWords } from "to-words";

type PdfProps = {
  record: IInvoice | undefined;
};

export const PDF: React.FC<PdfProps> = ({ record, amount }) => {
  const subtotal = 0;

  const formattedDate = new Date().getFullYear();
  const amountInWords = new ToWords({
    localeCode: "en-US",
    converterOptions: {
      currency: true,
    },
  })
    .convert(amount || 0)
    .replace(" Only", "");

  const currency = new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(amount);

  const text =
    "Payment to be made, in accordance with the above specifications, in the sum of:";

  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        <Page style={styles.page} size="A4">
          <View>
            <View style={styles.invoiceTextNumberContainer}>
              <View>
                <Text style={styles.h1}>H & T Sports, Inc.</Text>
                <Text>1911 N Sayre Ave</Text>
                <Text>Chicago, IL 60707</Text>
                <Text>(773) 889-9133</Text>
                <Text>hayat@gmail.com</Text>
              </View>
              <View>
                <Text style={styles.h2}>{"Invoice"}</Text>
                <Text>{formattedDate}</Text>
              </View>
            </View>
          </View>
          <View style={styles.dividerLG} />

          <View>
            <View style={styles.invoiceTextNumberContainer}>
              <View>
                <Text>Customer: </Text>
                <Text>Seller: </Text>
                <Text>Branch: </Text>
                <Text>Email:</Text>
              </View>
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderItem, { width: "10%" }]}>SL</Text>
              <Text style={[styles.tableHeaderItem, { width: "50%" }]}>
                ITEM
              </Text>
              <Text style={[styles.tableHeaderItem, { width: "10%" }]}>
                QTY
              </Text>
              <Text style={[styles.tableHeaderItem, { width: "15%" }]}>
                PRICE
              </Text>
              <Text style={[styles.tableHeaderItem, { width: "15%" }]}>
                TOTAL
              </Text>
            </View>
            {record?.missions?.map((item) => {
              return (
                <View key={item.id} style={styles.tableRow}>
                  <Text style={[styles.tableCol, { width: "10%" }]}>
                    {item.mission}
                  </Text>
                  <Text style={[styles.tableCol, { width: "50%" }]}>
                    {item?.day}
                  </Text>
                  <Text style={[styles.tableCol, { width: "10%" }]}>
                    {item?.daily_rate}
                  </Text>
                  <Text style={[styles.tableCol, { width: "15%" }]}>
                    {item?.daily_rate * item?.day}
                  </Text>
                  <Text style={[styles.tableCol, { width: "15%" }]}>
                    {item?.daily_rate * item?.day}
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={styles.signatureTotalContainer}>
            <View style={styles.signatureContainer}>
              <Text style={styles.signatureText}>
                Signature: ________________
              </Text>
              <Text style={styles.signatureText}>
                Date: {record?.date?.toString()}
              </Text>
            </View>

            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>SUBTOTAL: {subtotal}</Text>
              <Text style={styles.totalText}>
                Discount(%): {record?.discount}
              </Text>
              <Text style={styles.totalText}>Tax(%): {record?.tax}</Text>
            </View>
          </View>

          <View style={styles.amountContainer}>
            <Text>{text}</Text>
            <View style={styles.amount}>
              <Text>
                {amountInWords} ({currency})
              </Text>
            </View>
            <Text style={styles.signature}>
              Authorized Signature:
              _______________________________________________________________________________
            </Text>
          </View>

          <View style={styles.container}>
            <Text style={styles.left}>H & T Sports, Inc.</Text>
            <Text style={styles.right}>
              {`Seal Coating  ·  Striping  ·  Blacktop Paving and Repairs  ·  Insured and Bonded`}
            </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

const styles = StyleSheet.create({
  viewer: {
    width: "100%",
    height: "100vh",
    border: "none",
  },
  h1: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 6,
  },
  h2: {
    fontSize: 20,
    fontWeight: 400,
    marginBottom: 6,
  },
  page: {
    display: "flex",
    padding: "0.4in 0.4in",
    fontSize: 12,
    color: "#333",
    backgroundColor: "#fff",
  },
  invoiceTextNumberContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  invoiceText: {
    color: "#3aabf0",
  },
  invoiceId: {
    textAlign: "center",
  },
  invoiceForFromContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  invoiceForFromTitle: {
    marginBottom: 24,
  },
  invoiceFor: {
    flex: 1.5,
  },
  invoiceFrom: {
    flex: 1,
  },
  invoiceForFromText: {
    color: "#787878",
    lineHeight: 1.5,
  },
  dividerSM: {
    width: "100%",
    height: 1,
    marginTop: 12,
    marginBottom: 12,
    backgroundColor: "#e5e5e5",
  },
  dividerLG: {
    width: "100%",
    height: 1,
    marginTop: 40,
    marginBottom: 40,
    backgroundColor: "#e5e5e5",
  },
  table: {
    marginTop: 32,
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
  },
  tableHeaderItem: {
    paddingVertical: 8,
    border: "1px solid #000",
    borderBottom: "none",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
  },
  tableCol: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    border: "1px solid #000",
  },
  signatureTotalContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
  },
  signatureContainer: {},
  totalContainer: {},
  signatureText: {
    marginTop: 32,
  },
  totalText: {
    marginTop: 16,
  },
  footer: {
    borderTop: "1px solid #e5e5e5",
    paddingTop: 8,
    marginTop: "auto",
  },
  footerText: {
    color: "#787878",
    lineHeight: 1.5,
  },
  container: {
    borderTop: "1px solid #999",
    display: "flex",
    flexDirection: "row",
    fontSize: 10,
    marginTop: 32,
    paddingTop: 4,
  },
  left: {
    flex: 1,
  },
  right: {
    fontStyle: "italic",
  },
  amountContainer: {
    borderTop: "1px solid #999",
    fontSize: 10,
    marginTop: 16,
    paddingTop: 16,
  },
  amount: {
    borderLeft: "1px solid #aaa",
    fontSize: 12,
    marginLeft: 4,
    marginTop: 8,
    paddingLeft: 8,
  },
  signature: {
    marginTop: 24,
  },
});
