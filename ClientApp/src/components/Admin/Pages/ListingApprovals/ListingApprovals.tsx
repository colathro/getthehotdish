import React, { useState, useEffect } from 'react';
import { Layout, Descriptions, Button, Modal, List, Row, Col } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { Business } from '../../../../types';

import './ListingApprovals.scss';

const useQuery = () => new URLSearchParams(useLocation().search);

export const ListingApprovals: React.FC = () => {
  const history = useHistory();
  const query = useQuery();
  const [allApprovals, setAllApprovals] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  const key = query.get('key');

  const goAdmin = () => {
    history.push(`/admin?key=${key}`);
  };

  const error = () => {
    Modal.error({
      title: 'Error fetching pending approvals',
      content: 'something broke, bother colton',
      onOk: () => goAdmin(),
    });
  };

  const approved = () => {
    Modal.success({
      content: 'Successfully Approved.',
      onOk: () => goAdmin(),
    });
  };

  const denied = () => {
    Modal.success({
      content: 'Successfully Denied.',
      onOk: () => goAdmin(),
    });
  };

  const approve = (id: string) => {
    const requestOptions = {
      method: 'POST',
    };
    fetch(`/api/listing/approvals/approve/${key}/${id}`, requestOptions)
      .then((response) => response)
      .then((data) => {
        if (data.ok) {
          approved();
        } else {
          error();
        }
      })
      .catch(() => {
        error();
      });
  };

  const deny = (id: string) => {
    const requestOptions = {
      method: 'POST',
    };
    fetch(`/api/listing/approvals/approve/${key}/${id}`, requestOptions)
      .then((response) => response)
      .then((data) => {
        if (data.ok) {
          denied();
        } else {
          error();
        }
      })
      .catch(() => {
        error();
      });
  };

  const getPendingApprovals = () => {
    if (loading) {
      fetchUrl(`api/listing/approvals/get/${key}`)
        .then((data) => {
          setAllApprovals(data);
          setLoading(false);
        })
        .catch(() => {
          error();
        });
    }
  };

  const fetchUrl = async (url: string) => {
    const response = await fetch(url);
    return await response.json();
  };

  useEffect(() => {
    getPendingApprovals();
  }, []);

  return (
    <Layout id="listingapprovals">
      <Row justify="center">
        <Col md={16} sm={18} xs={24}>
          <List
            itemLayout="horizontal"
            dataSource={allApprovals}
            renderItem={(item) => (
              <List.Item>
                <Layout>
                  <Descriptions title={item.name}>
                    <Descriptions.Item label="Buisness Name">
                      {item.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Category">
                      {item.category}
                    </Descriptions.Item>
                    <Descriptions.Item label="Hours">
                      {item.hours}
                    </Descriptions.Item>
                    <Descriptions.Item label="Phone Number">
                      {item.phoneNumber}
                    </Descriptions.Item>
                    <Descriptions.Item label="Website">
                      {item.website}
                    </Descriptions.Item>
                    <Descriptions.Item label="Message">
                      {item.message}
                    </Descriptions.Item>
                    <Descriptions.Item label="Livestream Url">
                      {item.liveStreamUrl}
                    </Descriptions.Item>
                    <Descriptions.Item label="Order Url">
                      {item.orderUrl}
                    </Descriptions.Item>
                    <Descriptions.Item label="GiftCard Url">
                      {item.giftCardUrl}
                    </Descriptions.Item>
                    <Descriptions.Item label="Interactions">
                      {item.interactions}
                    </Descriptions.Item>
                    <Descriptions.Item label="Delivery Apps">
                      {item.deliveryApps}
                    </Descriptions.Item>
                  </Descriptions>
                  <Row>
                    <Col span={8}>
                      <Button type="primary" onClick={() => approve(item.id!)}>
                        Approve
                      </Button>
                    </Col>
                    <Col span={8} offset={8}>
                      <Button
                        type="primary"
                        danger
                        onClick={() => deny(item.id!)}
                      >
                        Deny
                      </Button>
                    </Col>
                  </Row>
                </Layout>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </Layout>
  );
};