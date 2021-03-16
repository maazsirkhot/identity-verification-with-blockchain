import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavBar from '../../Header/DashboardNavbar';
import '../../../assets/css/header.css';
import '../../../assets/css/dashboard.css';

export default function RequestInfo() {
  const approvaldata = useSelector((state) => state.verifier.approvaldata);
  let redirectVar = '';
  if (approvaldata === '') {
    console.log('Redirect');
    redirectVar = <Redirect to="/verifier/requests" />;
  } else {
    console.log(
      approvaldata.dataField[approvaldata.dataField.length - 2].field_value
    );
  }
  return (
    <div className="main-wrapper">
      {redirectVar}
      <NavBar />
      Back
      <div className="sub-wrapper" style={{ marginLeft: '120px' }}>
        <div className="container">
          <div className="col-xl-12 col-lg-12">
            <div className="card">
              <div className="card-body approval-request-info">
                <div>Hello123</div>
                <div className="sub-grid">
                  <div>
                    <a
                      class="venobox"
                      data-gall="gall1"
                      title="Image 1"
                      href="https://unsplash.it/1100"
                    >
                      <img
                        src="https://unsplash.it/1100"
                        alt=""
                        class="img-responsive"
                        width="100%"
                      />
                    </a>
                  </div>
                  <div>
                    <a
                      class="venobox"
                      data-gall="gall1"
                      title="Image 2"
                      href="https://unsplash.it/1000"
                    >
                      <img
                        src="https://unsplash.it/1000"
                        alt=""
                        class="img-responsive"
                        width="100%"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// import React from 'react';
// import { Redirect } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import NavBar from '../../Header/DashboardNavbar';
// import '../../../assets/css/header.css';
// import '../../../assets/css/dashboard.css';

// export default function RequestInfo() {
//   const approvaldata = useSelector((state) => state.verifier.approvaldata);
//   let redirectVar = '';
//   let frontImage = '';
//   let backImage = '';
//   if (approvaldata === '') {
//     redirectVar = <Redirect to="/verifier/requests" />;
//   } else {
//     frontImage =
//       approvaldata.dataField[approvaldata.dataField.length - 2].field_value;
//     backImage =
//       approvaldata.dataField[approvaldata.dataField.length - 1].field_value;
//   }
//   return (
//     <div className="main-wrapper">
//       {redirectVar}
//       <NavBar />
//       Back
//       <div className="sub-wrapper" style={{ marginLeft: '120px' }}>
//         <div className="container">
//           <div className="col-xl-12 col-lg-12">
//             <div className="card">
//               <div className="card-body approval-request-info">
//                 <div>
//                   {approvaldata !== '' &&
//                     approvaldata.dataField.map((field) => (
//                       <div className="form-group">
//                         {field.field_name} : {field.field_value}
//                       </div>
//                     ))}
//                 </div>
//                 <div className="sub-grid">
//                   <div>
//                     <a
//                       class="venobox"
//                       data-gall="gall1"
//                       title="Image 1"
//                       href={frontImage}
//                     >
//                       <img src={frontImage} alt="" width="100%" />
//                     </a>
//                   </div>
//                   <div>
//                     <a
//                       class="venobox"
//                       data-gall="gall1"
//                       title="Image 2"
//                       href="https://unsplash.it/1000"
//                     >
//                       <img
//                         src={backImage}
//                         alt=""
//                         class="img-responsive"
//                         width="100%"
//                       />
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
