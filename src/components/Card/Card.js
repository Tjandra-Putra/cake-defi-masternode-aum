import "./Card.css";

import dashImage from "../../assets/image/dash.png";

const Card = ({ currentPrice, nodesPrice, coinName, isActive, nodesValue, coinCurrency, currency }) => {
  return (
    <div className="card-wrapper">
      <div class="card">
        <div className="card-header">
          <div class="d-flex flex-row justify-content-between">
            <div>
              <div className="d-flex flex-row">
                <div>
                  {coinName === "Dash" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      class="injected-svg"
                      data-src="/static/media/icon-coin-dash.992004d7.svg"
                    >
                      <g fill="none">
                        <path
                          d="M15.918 31.928c8.8 0 15.928-7.128 15.928-15.928S24.718.072 15.918.072 0 7.2 0 16s7.128 15.928 15.918 15.928"
                          fill="#008CE3"
                        ></path>
                        <path
                          d="M18.349 9.026h-6.257l-.513 2.892 5.642.01c2.779 0 3.6 1.005 3.579 2.677-.01.862-.38 2.308-.544 2.78-.43 1.25-1.302 2.687-4.605 2.677h-5.487l-.523 2.902h6.236c2.195 0 3.138-.256 4.123-.718 2.195-1.015 3.508-3.18 4.03-6.01.79-4.215-.184-7.21-5.681-7.21"
                          fill="#FFF"
                        ></path>
                        <path
                          d="M9.405 14.544c-1.64 0-1.877 1.066-2.03 1.712-.206.841-.267 1.19-.267 1.19h6.4c1.64 0 1.877-1.067 2.03-1.713.206-.84.267-1.19.267-1.19h-6.4z"
                          fill="#FFF"
                        ></path>
                      </g>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      class="injected-svg"
                      data-src="/static/media/icon-coin-dfi.12257591.svg"
                    >
                      <g fill="none" fill-rule="evenodd">
                        <circle fill="#FF00AF" fill-rule="nonzero" cx="16" cy="16" r="16"></circle>
                        <path
                          d="M18.217 23.454V8.546c3.21.958 5.555 3.937 5.555 7.454s-2.346 6.496-5.555 7.454M15.994 6v8.428l-1.269-1.27-.162-3.167 1.324-3.985a9.952 9.952 0 0 0-2.454.338l-.64 1.926-1.816-.91a10.03 10.03 0 0 0-1.974 1.497l3.363 1.685.098 1.928-1.927-.099L8.85 9.01a10.035 10.035 0 0 0-1.497 1.973l.911 1.816-1.927.64A9.978 9.978 0 0 0 6 15.892l3.986-1.324 3.168.162 1.27 1.27-1.27 1.27-3.168.162L6 16.108c.009.849.13 1.669.338 2.454l1.927.64-.911 1.816c.418.719.92 1.383 1.497 1.973l1.686-3.362 1.927-.099-.098 1.928-3.363 1.685c.59.578 1.255 1.079 1.974 1.498l1.815-.911.64 1.926c.786.208 1.606.33 2.455.338l-1.324-3.985.162-3.168 1.27-1.27V26c5.522 0 10-4.477 10-10s-4.478-10-10-10"
                          fill="#FFF"
                        ></path>
                      </g>
                    </svg>
                  )}
                </div>
                <div>
                  <h4 className="ms-2 coin-name">{coinName}</h4>
                </div>
              </div>
            </div>
            <div>
              {isActive === "ACTIVE" ? (
                <div class="badge bg-grape ms-2">{isActive}</div>
              ) : (
                <div class="badge bg-secondary ms-2">INACTIVE</div>
              )}
            </div>
          </div>
        </div>

        <div class="card-body">
          <div className="row">
            <div className="col">
              <h6>Total Nodes Price</h6>
              <p>
                {nodesPrice} {currency}
              </p>
            </div>
            <div className="col">
              <h6>Total Nodes Value</h6>
              <p>
                {nodesValue} {coinCurrency}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h6>Current Market Price</h6>
              <p>
                {currentPrice} {currency}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
