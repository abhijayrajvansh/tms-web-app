import React from 'react';
import { DocketPayloadProps } from './docketSlipInterface';

const DocketSlipUI = ({ docketData }: { docketData: DocketPayloadProps }) => {
  const [docketPayload, setDocketPayload] = React.useState<DocketPayloadProps>({
    receiptNumber: '',
    date: '',
    origin: {
      name: '',
      company: '',
      address: '',
      city: '',
      country: '',
      tin: '',
      mobileNo: '',
      dated: '',
      truckNo: '',
    },
    destination: {
      name: '',
      company: '',
      address: '',
      city: '',
      country: '',
      tin: '',
      mobileNo: '',
      dated: '',
      truckNo: '',
    },
    charges: {
      freightCharge: '-',
      serTax: '-',
      labourCharge: '-',
      grCharge: '-',
      handlingCharge: '-',
      subTotal: '-',
      total: '-',
      grandTotal: '-',
    },
    packages: {
      count: 0,
      packing: '',
      dimensions: '',
      actualWeight: '',
      chargedWeight: '',
    },
    gstInfo: {
      pan: '',
      gstin: '',
      transporterId: '',
      gstinTaxPayableInfo: [],
    },
    billInfo: {
      billNo: '',
      value: '0',
      paymentMode: 'PAID',
    },
  });

  // Merge the default values with the provided data
  React.useEffect(() => {
    if (docketData) {
      const mergedData = {
        ...docketPayload,
        ...docketData,
      };
      setDocketPayload(mergedData);
    }
  }, [docketData]);

  return (
    <div className="receipt-content bg-white border border-gray-300 p-2 font-sans text-[8px] text-black print:border print:border-black">
      <div className="border border-black h-full w-full">
        {/* Header Row */}
        <div className="flex border-b border-black">
          {/* Logo and Company Info - Further reduced size */}
          <div className="w-1/4 border-r border-black p-0.5">
            <div className="flex items-center">
              <div className="p-1 border border-[#065398] ">
                <img src="/logo/jaiz-logistics-logo.png" alt="jaiz-logo" className="h-10" />
              </div>
              <div className="ml-1">
                <div className="text-red-600 font-bold text-[10px]">JAI'Z LOGISTICS INC.</div>
                <div className="text-[6px]">
                  Jaiz Logistics Park, Near Mount Carmel School
                  <br />
                  Rakkar Colony - Una HP - 174303
                  <br />
                  Mob.: +91 98169 01111, 98051 01111
                  <br />
                  Website: www.jaizlogistics.com
                </div>
              </div>
            </div>
          </div>

          {/* Rest of the header with reduced padding */}
          <div className="w-1/4 border-r border-black pt-2">
            <div className="flex justify-around">
              <div className="text-left ml-5 w-full font-bold text-[10px]">INTERNATIONAL</div>
              <div className="flex w-full gap-3">
                <div className="flex items-center">
                  <div className="border border-black w-2.5 h-2.5 mr-0.5"></div>
                  <span className="text-[6px]">DOX</span>
                </div>
                <div className="flex items-center">
                  <div className="border border-black w-2.5 h-2.5 mr-0.5"></div>
                  <span className="text-[6px]">NON-DOX</span>
                </div>
              </div>
            </div>

            <div className="flex justify-around">
              <div className="text-left ml-5 w-full font-bold text-[10px] mt-0.5">DOMESTIC</div>
              <div className="flex w-full gap-3">
                <div className="flex items-center">
                  <div className="border border-black w-2.5 h-2.5 mr-0.5"></div>
                  <span className="text-[6px]">DOX</span>
                </div>
                <div className="flex items-center">
                  <div className="border border-black w-2.5 h-2.5 mr-0.5"></div>
                  <span className="text-[6px]">NON-DOX</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/4 border-r border-black p-0.5">
            <div className="text-center font-bold text-[10px] mb-0.5">MODE OF TRANSPORT</div>
            <div className="flex justify-around pt-2">
              <div className="flex items-center">
                <div className="border border-black w-2.5 h-2.5 mr-0.5"></div>
                <span className="text-[6px]">AIR</span>
              </div>
              <div className="flex items-center">
                <div className="border border-black w-2.5 h-2.5 mr-0.5"></div>
                <span className="text-[6px]">TRAIN</span>
              </div>
              <div className="flex items-center">
                <div className="border border-black w-2.5 h-2.5 mr-0.5"></div>
                <span className="text-[6px]">ROAD</span>
              </div>
            </div>
          </div>

          <div className="w-1/4 p-0.5 flex flex-col justify-center items-center">
            <div className="text-base font-bold">{docketPayload.receiptNumber}</div>
            <div className="mt-0.5 w-full flex justify-between">
              <div className="text-red-600 text-[6px]">DATE</div>
              <div className="border-b border-black px-1 text-[8px]">{docketPayload.date}</div>
            </div>
          </div>
        </div>

        {/* Origin and Destination */}
        <div className="flex ">
          <div className="w-1/2 border-r border-black">
            <div className="bg-gray-100 border-b border-black px-1 py-0.5">
              <span className="font-bold text-[8px]">ORIGIN</span>
            </div>
            <div className="p-1">
              <div className="mb-1">
                <span className="text-[10px] align-top">From (Shipper's Name)</span>
                <span className="border-b border-black w-full inline-block ml-1">
                  {docketPayload.origin?.name}
                </span>
              </div>
              <div className="mb-1">
                <span className="text-[10px]">Company</span>
                <span className="border-b border-black w-full inline-block ml-1">
                  {docketPayload.origin?.company}
                </span>
              </div>
              <div className="mb-1">
                <span className="text-[10px]">Address</span>
                <span className="border-b border-black w-full inline-block ml-1">
                  {docketPayload.origin?.address || ''}
                </span>
              </div>
              <div className="mb-1 flex">
                <div className="flex-1">
                  <span className="text-[10px]">City</span>
                  <span className="border-b border-black w-3/4 inline-block ml-1">
                    {docketPayload.origin?.city || ''}
                  </span>
                </div>
                <div className="flex-1">
                  <span className="text-[10px]">Country</span>
                  <span className="border-b border-black w-3/4 inline-block ml-1">
                    {docketPayload.origin?.country || ''}
                  </span>
                </div>
              </div>
              <div className="mb-1">
                <span className="text-[10px]">Tin</span>
                <span className="border-b border-black w-full inline-block ml-1">
                  {docketPayload.origin?.tin || ''}
                </span>
              </div>
              <div className="mb-1 flex">
                <div className="flex-1">
                  <span className="text-[10px]">Mobile No</span>
                  <span className="border-b border-black w-3/4 inline-block ml-1">
                    {docketPayload.origin?.mobileNo || ''}
                  </span>
                </div>
                <div className="flex-1">
                  <span className="text-[10px]">Dated</span>
                  <span className="border-b border-black w-3/4 inline-block ml-1">
                    {docketPayload.origin?.dated || ''}
                  </span>
                </div>
              </div>
              <div className="mb-1">
                <span className="text-[10px]">Truck No.</span>
                <span className="border-b border-black w-full inline-block ml-1">
                  {docketPayload.origin?.truckNo || ''}
                </span>
              </div>
            </div>
          </div>

          <div className="w-1/2">
            <div className="flex">
              <div className="bg-gray-100 border-b border-r border-black px-1 py-0.5 w-full">
                <span className="text-red-600 font-bold text-[8px]">DESTINATION</span>
              </div>
              <div className="bg-gray-100 border-b border-black px-1 py-0.5 w-24 text-center">
                <span className="text-red-600 font-bold text-[8px]">CHARGES</span>
              </div>
              <div className="bg-gray-100 border-b border-black px-1 py-0.5 w-20 text-center">
                <span className="text-red-600 font-bold text-[8px]">AMOUNT</span>
              </div>
            </div>
            <div className="flex">
              <div className="p-1 w-full border-r border-black">
                <div className="mb-1">
                  <span className="text-[10px] align-top">To (Receiver's Name)</span>
                  <span className="border-b border-black w-full inline-block ml-1">
                    {docketPayload.destination?.name}
                  </span>
                </div>
                <div className="mb-1">
                  <span className="text-[10px]">Company</span>
                  <span className="border-b border-black w-full inline-block ml-1">
                    {docketPayload.destination?.company || ''}
                  </span>
                </div>
                <div className="mb-1">
                  <span className="text-[10px]">Address</span>
                  <span className="border-b border-black w-full inline-block ml-1">
                    {docketPayload.destination?.address || ''}
                  </span>
                </div>
                <div className="mb-1 flex">
                  <div className="flex-1">
                    <span className="text-[10px]">City</span>
                    <span className="border-b border-black w-3/4 inline-block ml-1">
                      {docketPayload.destination?.city || ''}
                    </span>
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px]">Country</span>
                    <span className="border-b border-black w-3/4 inline-block ml-1">
                      {docketPayload.destination?.country}
                    </span>
                  </div>
                </div>
                <div className="mb-1">
                  <span className="text-[10px]">Tin</span>
                  <span className="border-b border-black w-full inline-block ml-1">
                    {docketPayload.destination?.tin || ''}
                  </span>
                </div>
                <div className="mb-1 flex">
                  <div className="flex-1">
                    <span className="text-[10px]">Mobile No</span>
                    <span className="border-b border-black w-3/4 inline-block ml-1">
                      {docketPayload.destination?.mobileNo || ''}
                    </span>
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px]">Dated</span>
                    <span className="border-b border-black w-3/4 inline-block ml-1">
                      {docketPayload.destination?.dated || ''}
                    </span>
                  </div>
                </div>
                <div className="mb-1">
                  <span className="text-[10px]">Truck No.</span>
                  <span className="border-b border-black w-full inline-block ml-1">
                    {docketPayload.destination?.truckNo || ''}
                  </span>
                </div>
              </div>
              <div className="w-24 border-r border-black">
                <div className="border-b border-black p-0.5">
                  <div className="text-[8px] font-semibold">FREIGHT CHARGE</div>
                </div>
                <div className="border-b border-black p-0.5">
                  <div className="text-[8px] font-semibold">SER. TAX</div>
                </div>
                <div className="border-b border-black p-0.5">
                  <div className="text-[8px] font-semibold">LABOUR CHARGE</div>
                </div>
                <div className="border-b border-black p-0.5">
                  <div className="text-[8px] font-semibold">G. R. CHARGE</div>
                </div>
                <div className="border-b border-black p-0.5">
                  <div className="text-[8px] font-semibold">HANDLING CHARGE</div>
                </div>
                <div className="border-b border-black p-0.5">
                  <div className="text-[8px] font-semibold">SUB -TOTAL</div>
                </div>
                <div className="border-b border-black p-0.5">
                  <div className="text-[8px] font-semibold">TOTAL</div>
                </div>
                <div className="p-0.5">
                  <div className="text-[8px] font-semibold">GRAND TOTAL</div>
                </div>
              </div>
              <div className="w-20 flex flex-col">
                <div className="border-b border-black p-0.5 h-8 flex">
                  <div className="border-r border-black w-8 text-center">Rs.</div>
                  <div className="w-8 text-center">P.</div>
                </div>
                <div className="border-b border-black p-0.5 h-6 text-center">
                  {docketPayload.charges?.freightCharge || '-'}
                </div>
                <div className="border-b border-black p-0.5 h-6 text-center">
                  {docketPayload.charges?.serTax || '-'}
                </div>
                <div className="border-b border-black p-0.5 h-6 text-center">
                  {docketPayload.charges?.labourCharge || '-'}
                </div>
                <div className="border-b border-black p-0.5 h-6 text-center">
                  {docketPayload.charges?.grCharge || '-'}
                </div>
                <div className="border-b border-black p-0.5 h-6 text-center">
                  {docketPayload.charges?.handlingCharge || '-'}
                </div>
                <div className="border-b border-black p-0.5 h-6 text-center">
                  {docketPayload.charges?.subTotal || '-'}
                </div>
                <div className="border-b border-black p-0.5 h-6 text-center">
                  {docketPayload.charges?.total || '-'}
                </div>
                <div className="p-0.5 h-6 relative">
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 font-bold text-2xl">
                    {docketPayload.charges?.grandTotal || '-'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Package Details */}
      <div className="border border-black">
        <div className="flex">
          <div className="w-16 border-r border-black p-0.5 text-center">
            <div className="text-[6px]">No. of Pkgs.</div>
            <div className="text-sm font-bold">{docketPayload.packages?.count}</div>
          </div>
          <div className="w-16 border-r border-black p-0.5 text-center">
            <div className="text-[6px]">Packing</div>
            <div className="text-sm font-bold">{docketPayload.packages?.packing}</div>
          </div>
          <div className="flex-1 border-r border-black p-0.5">
            <div className="text-[10px] text-center italic">Said to be Contain</div>
          </div>
          <div className="w-1/3 p-0.5">
            <div className="flex mt-1">
              <div className="w-1/2 text-center font-bold text-[8px]">
                {docketPayload.packages?.dimensions}
              </div>
              <div className="w-1/4 text-center font-bold text-[8px]">
                {docketPayload.packages?.actualWeight}
              </div>
              <div className="w-1/4 text-center font-bold text-[8px]">
                {docketPayload.packages?.chargedWeight || ''}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex border border-black">
        <div className="flex w-full text-[#223455]">
          <div className="w-1/2 p-1 border-r border-black flex flex-col justify-between">
            <div className="text-[10px] mb-1">
              The goods of in this G.R. have booked AT OWNER'S RISK. A carbon copy has been received
              by consignor is taken of all terms & conditions. The company is not responsible for
              leakage & breakage.
            </div>
            <div className="flex mt-2">
              <div className="w-1/3">
                <div className="">Driver's Name:</div>
                <div className="mt-2 ">Signature:</div>
              </div>
            </div>
          </div>

          <div className=" p-1 flex flex-col justify-between text-[#223455]">
            <div className="font-bold text-[10px]">PAN : {docketPayload.gstInfo?.pan}</div>
            <div className="font-bold text-[10px]">GSTIN : {docketPayload.gstInfo?.gstin}</div>
            <div className="font-bold text-[10px]">
              TRANSPORTER ID : {docketPayload.gstInfo?.transporterId}
            </div>
            {docketPayload.gstInfo?.gstinTaxPayableInfo.map((info, index) => (
              <div key={index} className="font-bold text-[10px]">
                {info}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full border-l border-black ">
          <div className="border-b border-black p-1">
            <div className="flex">
              <div className="w-full">
                <div className="w-full text-red-600 font-bold text-[8px]">DELIVERY AT</div>
                <div className="flex mt-2">
                  <div className="text-[10px]">Bill No</div>
                  <div className="ml-2 border-b border-black flex-1 text-center font-bold">
                    {docketPayload.billInfo?.billNo}
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <div className="text-[10px]">Value</div>
                  <div className="ml-2 border-b border-black flex-1 text-center font-bold">
                    {docketPayload.billInfo?.value}
                  </div>
                </div>
              </div>

              <div className="w-full p-1">
                <div className="text-red-600 font-bold text-[8px] text-center mb-1">
                  PAYMENT MODE
                </div>
                <div className="flex justify-center space-x-4">
                  <div className="flex items-center">
                    <div
                      className={`border border-black w-4 h-4 mr-1 ${
                        docketPayload.billInfo?.paymentMode === 'PAID' ? 'bg-black' : ''
                      }`}
                    ></div>
                    <span className="">PAID</span>
                  </div>
                  <div className="flex items-center">
                    <div
                      className={`border border-black w-4 h-4 mr-1 ${
                        docketPayload.billInfo?.paymentMode === 'TO PAY' ? 'bg-black' : ''
                      }`}
                    ></div>
                    <span className="">TO PAY</span>
                  </div>
                  <div className="flex items-center">
                    <div
                      className={`border border-black w-4 h-4 mr-1 ${
                        docketPayload.billInfo?.paymentMode === 'CREDIT' ? 'bg-black' : ''
                      }`}
                    ></div>
                    <span className="">CREDIT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-1">
            <div className="font-bold">RECEIVED IN GOOD CONDITION</div>
            <div className="mt-2">
              <div className="flex">
                <div className="text-[10px] w-16">NAME :</div>
                <div className="border-b border-black flex-1"></div>
              </div>
              <div className="flex mt-2">
                <div className="text-[10px] w-16">MOB :</div>
                <div className="border-b border-black flex-1"></div>
              </div>
              <div className="flex mt-2">
                <div className="text-[10px] w-16">DATE :</div>
                <div className="border-b border-black flex-1"></div>
                <div className="text-[10px] w-24 ml-4">SIGNATURE</div>
                <div className="border-b border-black w-32"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Received By Footer - Reduced padding */}
      <div className="border-t border-black p-1 flex justify-between items-center">
        <div className="font-bold text-red-600 text-[8px]">Received By : JAI'Z LOGISTICS INC.</div>

        <div className="mr-2 flex gap-3 w-1/2 p-1">
          <div className="mb-0.5 flex">
            Signature: <div className="border-b border-black h-4 w-24"></div>
          </div>
          <div className="mb-0.5 flex">
            Date: <div className="border-b border-black h-4 w-24"></div>
          </div>
          <div className="flex">
            Time: <div className="border-b border-black h-4 w-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocketSlipUI;
