import React, { Component } from 'react';
import { Button, Col, Form, Icon, Input, Row } from 'antd';

// Styles
import '../less/CallToActionBanner.less';

export const emailLink = `mailto:partnerships@marketprotocol.io?subject=Partnership%20with%20MARKET%20Protocol&body=
  Please%20explain%20your%20company%20and%20your%20interest%20
  in%20the%20protocol%20as%20well%20as%20any%20other%20helpful%20details.`;

class CallToActionBannerComponent extends Component {
  render() {
    const { form } = this.props;
    return (
      <div className="banner-wrapper">
        <Row type="flex" justify="center">
          <Col xs={24} md={12} lg={9} xxl={6}>
            <div className="button-container">
              <h2 className="action-text">Join our Newsletter</h2>
              <Form
                action="https://marketprotocol.us17.list-manage.com/subscribe/post"
                onSubmit={e => {
                  form.validateFields((errors, _) => {
                    if (errors) {
                      e.preventDefault();
                    }
                  });
                }}
                acceptCharset="utf-8"
                method="post"
              >
                <input
                  type="hidden"
                  name="u"
                  value="ef1f265a21b4aae9002084ee3"
                />
                <input type="hidden" name="id" value="491f750dec" />
                <Form.Item>
                  <div className="input-wrapper">
                    {form.getFieldDecorator('email', {
                      rules: [
                        {
                          message: 'Please input an Email!',
                          required: true
                        },
                        {
                          message: 'Please input a correct Email',
                          type: 'email'
                        }
                      ]
                    })(
                      <Input
                        name="MERGE0"
                        type="email"
                        placeholder="Enter your email"
                      />
                    )}
                    <Button
                      className="newsletter-button"
                      type="primary"
                      shape="circle"
                      size={'large'}
                      htmlType="submit"
                      icon="arrow-right"
                    />
                  </div>
                </Form.Item>
              </Form>
            </div>
          </Col>
          <Col xs={24} md={12} lg={9} xxl={6}>
            <div className="button-container">
              <h2 className="action-text">Become a Partner</h2>
              <Button
                href={emailLink}
                type="primary"
                style={{ width: '100%', textAlign: 'left' }}
              >
                Click To Subscribe{' '}
                <Icon
                  type="arrow-right"
                  style={{ position: 'absolute', top: '35%', right: '15px' }}
                />
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const CallToActionBanner = Form.create()(CallToActionBannerComponent);

export default CallToActionBanner;
