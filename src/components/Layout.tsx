import { Layout, Button } from 'antd';
import { LanguageContext } from '../context/LanguageContext';
import { useContext } from 'react';

const { Content, Footer } = Layout;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { language, setLanguage, t } = useContext(LanguageContext);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '24px 50px' }}>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <Button 
          type={language === 'en' ? 'primary' : 'default'}
          onClick={() => setLanguage('en')}
        >
          English
        </Button>
        <Button 
          type={language === 'de' ? 'primary' : 'default'}
          onClick={() => setLanguage('de')}
          style={{ marginLeft: 8 }}
        >
          Deutsch
        </Button>
      </Footer>
    </Layout>
  );
}