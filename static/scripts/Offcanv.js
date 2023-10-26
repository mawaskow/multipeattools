import {getLayerByName} from './customFunctions.js'

const map=$('#map').data('map');

/**
 * Elements that make up the offcanvas.
 */
const container = document.getElementById('offc-div');
const content = document.getElementById('offcanvas-body');

map.on('singleclick', function (evt) {
    const coordinate = evt.coordinate;
  
    const view=map.getView();
    const resolution=view.getResolution();
    const projection=view.getProjection();
  
    // bnm
    const bogInfo=$('#offc-bog-info');
    bogInfo.html('');
    // project sites
    const PSInfo=$('#offc-PS-info');
    PSInfo.html('');
    // Raised Bog
    const D1Info=$('#offc-D1-info');
    D1Info.html('');
    // LL Atlantic Bog
    const D2Info=$('#offc-D2-info');
    D2Info.html('');
    // HL Montane Bog
    const D3Info=$('#offc-D3-info');
    D3Info.html('');
    // policies
    const ipolHead=$('#offc-ipol-header');
    ipolHead.html('');
    const ipolInfo=$('#offc-ipol-info');
    ipolInfo.html('');
    // default
    const noFeatures=$('#offc-no-features');
    noFeatures.html('<p>No features</p>');
  
    // getting the layer source: getting the layer itself
    const bogLayer=getLayerByName('Bord_na_Mona');
    const bogSource=bogLayer.getSource();
    const bogUrl=bogSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json'});

        if(bogUrl){
            $.ajax({
                url:bogUrl,
                method:'GET',
                success:function(result){
                    const bog=result.features[0];
                    if(bog){
                        const bogName=bog.properties.name;
                        //const bogGroup=bog.properties.boggroup;
                        const bogArea=bog.properties.area_km2;

                        bogInfo.html(`<h5>Bog Info</h5> 
                            <p>Name: ${bogName}</p>
                            <p>Area (sqkm): ${bogArea.toFixed(2)}</p>`);
                        noFeatures.html('');
                        }

                }
            })
        }
  
    const ipolLayer=getLayerByName('Policies');
    const ipolSource=ipolLayer.getSource();
    const ipolUrl=ipolSource.getFeatureInfoUrl(coordinate, resolution, projection,
        {'INFO_FORMAT':'application/json', 'FEATURE_COUNT':'1000'});    
    if(ipolUrl){
        $.ajax({
            url:ipolUrl,
            method:'GET',
            success:function(result){
                ipolHead.html(`<br><h5>Policy Info</h5>`);
                for (let i=0; i < result.features.length; i++){
                    const ipol=result.features[i];
                    if(ipol){
                        const ipolPol=ipol.properties.name;
                        const lvlPol=ipol.properties.level;
                        const clsPol=ipol.properties.classif;
                        const lnkPol=ipol.properties.link;

                        var element = 
                            `<p>Name: ${ipolPol}</p>
                            <p>Level: ${lvlPol}</p>
                            <p>Classification: ${clsPol}</p>
                            <a href=${lnkPol}>Link to Policy</a>
                            <br>`;
                        ipolInfo.append(element);
                        noFeatures.html('');
                    }
                }
            }
        })
    }
  
    const PSLayer=getLayerByName('Project_Sites');
    const PSSource=PSLayer.getSource();
    const PSUrl=PSSource.getFeatureInfoUrl(coordinate, resolution, projection,
    {'INFO_FORMAT':'application/json'});

    if(PSUrl){
        $.ajax({
            url:PSUrl,
            method:'GET',
            success:function(result){
                const PS=result.features[0];
                if(PS){
                    const Sname=PS.properties.site_name;
                    const Pname=PS.properties.proj_name;

                    PSInfo.html(`<br><h5>Project Info</h5> 
                        <p>Site Name: ${Sname}</p>
                        <p>Project Name: ${Pname}</p>`);
                    noFeatures.html('');
                    }

            }
        })
    }
    
    const D1Layer=getLayerByName('Raised_Bog');
    const D1Source=D1Layer.getSource();
    const D1Url=D1Source.getFeatureInfoUrl(coordinate, resolution, projection,
    {'INFO_FORMAT':'application/json'});

    if(D1Url){
        $.ajax({
            url:D1Url,
            method:'GET',
            success:function(result){
                const D1=result.features[0];
                if(D1){
                    const D1gc=D1.properties.site_type;

                    D1Info.html(`<br><h5>Bog Type</h5> 
                        <p>${D1gc}</p>`);
                    noFeatures.html('');
                    }

            }
        })
    }
    
    const D2Layer=getLayerByName('LL_Atlantic_Bog');
    const D2Source=D2Layer.getSource();
    const D2Url=D2Source.getFeatureInfoUrl(coordinate, resolution, projection,
    {'INFO_FORMAT':'application/json'});

    if(D2Url){
        $.ajax({
            url:D2Url,
            method:'GET',
            success:function(result){
                const D2=result.features[0];
                if(D2){
                    const D2gc=D2.properties.site_type;

                    D2Info.html(`<br><h5>Bog Type</h5> 
                        <p>${D2gc}</p>`);
                    noFeatures.html('');
                    }

            }
        })
    }
      
    const D3Layer=getLayerByName('HL_Montane_Bog');
    const D3Source=D3Layer.getSource();
    const D3Url=D3Source.getFeatureInfoUrl(coordinate, resolution, projection,
    {'INFO_FORMAT':'application/json'});

    if(D3Url){
        $.ajax({
            url:D3Url,
            method:'GET',
            success:function(result){
                const D3=result.features[0];
                if(D3){
                    const D3gc=D3.properties.site_type;

                    D3Info.html(`<br><h5>Bog Type</h5> 
                        <p>${D3gc}</p>`);
                    noFeatures.html('');
                    }

            }
        })
    }
});