import { IonButton, IonCard, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonImg, IonLabel, IonPage, IonRow, IonText, IonTitle, IonToolbar, useIonLoading } from '@ionic/react';
import { apertureOutline, warningOutline, camera } from 'ionicons/icons';
import { useState } from 'react';
import { uploadImage } from '../utils/image';
import { getLocation } from '../utils/location';
import usePhotoGallery from '../utils/usePhotoGallery';
import { Pie } from 'react-chartjs-2';
import http from '../utils/http';
import { useReportModal } from './ReportModal';

const createChartData = ({ dogNames, dogPercents }: { dogNames: string[], dogPercents: number[] }) => {
    return {
      labels: dogNames,
      datasets: [
        {
          label: 'אחוזי התאמה',
          data: dogPercents,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
}

const CameraPage: React.FC = () => {
    const [img, setImg] = useState<string | undefined>();
    const [chartData, setChartData] = useState<any>();
    const [similarPets, setSimilarPets] = useState<string[]>();
    const { takePhoto } = usePhotoGallery();
    const [present, dismiss] = useIonLoading();
    const { openReportModal } = useReportModal();

    const getPhoto = async () => {
        try {
            const image = await takePhoto();
            setImg(image.dataUrl);
            setChartData(undefined);
            setSimilarPets(undefined);
        } catch {
            console.log('User cancelled photos app');
        }
    }

    const recognize = async () => {
        if (!img) return;
 
        try {
            present('מזהה...');
            const result = await uploadImage(img);
            const chartData = createChartData({
                dogNames: Object.keys(result),
                dogPercents: Object.values(result).map(Number),
            })
            setChartData(chartData);
            const _similarPets = await Promise.allSettled(chartData.labels.map((pet: string) => http(`/api/pets/images/breed/${pet}`, { method: 'GET' })));
            setSimilarPets(_similarPets.filter(p => p.status === 'fulfilled').map((p: any) => p.value.url));
            dismiss();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }

    const report = async () => {
        if (!img) return;
        try {
            const location = await getLocation();
            openReportModal({ location, image: img });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>צלם כלב</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">צלם כלב</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonFab vertical={img ? 'bottom' : 'center'} horizontal={img ? 'end' : 'center'} style={{ transform: img ? '' : 'scale(3)' }} slot="fixed">
                    <IonFabButton onClick={getPhoto}>
                        <IonIcon icon={camera}></IonIcon>
                    </IonFabButton>
                </IonFab>
                {img && (
                    <IonCard>
                        <IonImg src={img} />
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonButton color="primary" fill="outline" expand="block" onClick={recognize}>
                                        <IonIcon slot="end" icon={apertureOutline} />זהה
                                    </IonButton>
                                </IonCol>
                                <IonCol>
                                    <IonButton color="danger" fill="outline" expand="block" onClick={report}>
                                        <IonIcon slot="end" icon={warningOutline} />דווח
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                            {chartData && similarPets && (
                                <>
                                    <IonRow>
                                        <Pie data={chartData} />
                                    </IonRow>
                                    {similarPets?.length && (
                                        <>
                                             <IonHeader style={{ marginTop: 20 }}>
                                                <IonToolbar>
                                                    <IonTitle>כלבים דומים</IonTitle>
                                                </IonToolbar>
                                            </IonHeader>
                                            <IonRow>
                                                {similarPets?.map((pet: string) => (
                                                    <IonCol key={pet}>
                                                        <IonImg src={pet}></IonImg>
                                                    </IonCol>
                                                ))}
                                            </IonRow>
                                        </>
                                    )}
                                </>
                            )}
                        </IonGrid>
                    </IonCard>
                )}
            </IonContent>
        </IonPage>
    );
};

export default CameraPage;
